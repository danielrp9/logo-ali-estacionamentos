"""
Logo Ali Estacionamentos - Admin Configuration (Deep Audit Edition)
Author: Daniel Rodrigues Pereira | Year: 2026
Finalidade: Auditoria de valores (De -> Para) conforme Normas N07.1
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.admin.models import LogEntry, ADDITION, CHANGE, DELETION
from django.utils.html import format_html
from django.forms.models import model_to_dict
from django.contrib.contenttypes.models import ContentType
from .models import Usuario, Veiculo

@admin.register(LogEntry)
class LogEntryAdmin(admin.ModelAdmin):
    list_display = ('action_time', 'user', 'get_action_flag', 'object_repr', 'get_change_details')
    list_filter = ('action_flag', 'user')
    search_fields = ('object_repr', 'change_message')
    date_hierarchy = 'action_time'

    def get_action_flag(self, obj):
        flags = {
            ADDITION: ('CADASTRO', '#00b247'),
            CHANGE: ('ALTERAÇÃO', '#f59e0b'),
            DELETION: ('EXCLUSÃO', '#ef4444'),
        }
        name, color = flags.get(obj.action_flag, ('DESCONHECIDO', '#8d948a'))
        return format_html('<b style="color: {};">{}</b>', color, name)
    get_action_flag.short_description = 'Operação'

    def get_change_details(self, obj):
        """Traduz o log técnico em mudanças de valores reais (DE -> PARA)"""
        msg = obj.get_change_message()
        if "VALORES:" in msg:
            return msg.split("VALORES:")[-1].strip()
        
        msg = msg.replace('Tipo usuario', 'Nível de Acesso')
        return msg
    get_change_details.short_description = 'Detalhes (De -> Para)'

    def has_add_permission(self, request): return False
    def has_change_permission(self, request, obj=None): return False
    def has_delete_permission(self, request, obj=None): return False

# --- MIXIN DE AUDITORIA PARA CAPTURAR VALORES ANTES E DEPOIS ---

class AuditAdminMixin:
    """Injeta detalhes de De/Para nas mensagens de log do Django"""
    def save_model(self, request, obj, form, change):
        if change: 
            old_obj = self.model.objects.get(pk=obj.pk)
            old_data = model_to_dict(old_obj)
            new_data = form.cleaned_data
            
            changes = []
            for field, old_value in old_data.items():
                new_value = new_data.get(field)
                # Verifica se o valor mudou e se está nos dados modificados do formulário
                if new_value != old_value and field in form.changed_data:
                    changes.append(f"[{field}]: '{old_value}' → '{new_value}'")
            
            if changes:
                change_msg = "VALORES: " + " | ".join(changes)
                
                # Obtém o ContentType de forma estável para o Django 5.1
                ct = ContentType.objects.get_for_model(obj)
                
                LogEntry.objects.log_action(
                    user_id=request.user.pk,
                    content_type_id=ct.pk,
                    object_id=obj.pk,
                    object_repr=str(obj),
                    action_flag=CHANGE,
                    change_message=change_msg
                )
        super().save_model(request, obj, form, change)

# --- APLICAÇÃO NOS MODELS ---

@admin.register(Usuario)
class UsuarioAdmin(AuditAdminMixin, UserAdmin):
    list_display = ('cpf', 'username', 'nome_completo', 'tipo_usuario', 'is_staff')
    list_editable = ('tipo_usuario',)
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Identidade', {'fields': ('cpf', 'nome_completo', 'email', 'telefone')}),
        ('Permissões', {'fields': ('tipo_usuario', 'is_active', 'is_staff', 'is_superuser')}),
    )

@admin.register(Veiculo)
class VeiculoAdmin(AuditAdminMixin, admin.ModelAdmin):
    list_display = ('placa', 'modelo', 'usuario', 'horario_entrada')
    readonly_fields = ('horario_entrada', 'criado_por')

admin.site.site_header = "Logo Ali - Terminal de Auditoria SASI"
admin.site.site_title = "Logo Ali Admin"
admin.site.index_title = "Gerenciamento de Estacionamento"