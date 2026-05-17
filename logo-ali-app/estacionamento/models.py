from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    CLIENTE = 'CL'
    FUNCIONARIO = 'FU'
    ADMIN = 'AD'
    
    TIPO_CHOICES = [
        (CLIENTE, 'Cliente'),
        (FUNCIONARIO, 'Funcionário'),
        (ADMIN, 'Administrador'),
    ]

    cpf = models.CharField(max_length=11, primary_key=True, verbose_name="CPF")
    nome_completo = models.CharField(max_length=150)
    telefone = models.CharField(max_length=15)
    
    cidade = models.CharField(max_length=100)
    bairro = models.CharField(max_length=100)
    rua = models.CharField(max_length=100)
    numero = models.CharField(max_length=10)
    
    tipo_usuario = models.CharField(max_length=2, choices=TIPO_CHOICES, default=CLIENTE)

    REQUIRED_FIELDS = ['nome_completo', 'email', 'cpf']

    def save(self, *args, **kwargs):
        # GANTE QUE O SUPERADMIN DO TERMINAL JÁ NASÇA COM O TIPO ADMINISTRADOR ATIVO
        if self.is_superuser:
            self.tipo_usuario = self.ADMIN
            self.is_staff = True

        # AJUSTA AS FLAGS NATIVAS COM BASE NO TIPO SELECIONADO MANUALMENTE PARA OUTROS USUÁRIOS
        if self.tipo_usuario in [self.FUNCIONARIO, self.ADMIN]:
            self.is_staff = True
        if self.tipo_usuario == self.ADMIN:
            self.is_superuser = True
            
        super().save(*args, **kwargs)

    class Meta:
        db_table = 'auth_user_custom'

class Veiculo(models.Model):
    usuario = models.ForeignKey('Usuario', on_delete=models.CASCADE, related_name='veiculos')
    placa = models.CharField(max_length=7) 
    modelo = models.CharField(max_length=50)
    cor    = models.CharField(max_length=20)
    avarias = models.TextField(blank=True)
    
    # CAMPOS DE AUDITORIA DE REGISTRO
    horario_entrada = models.DateTimeField(default=timezone.now)
    horario_saida   = models.DateTimeField(null=True, blank=True)
    criado_por = models.ForeignKey(
        'Usuario', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='registros_realizados',
        verbose_name="Operador Responsável"
    )

    def __str__(self):
        return f"{self.modelo} - {self.placa}"