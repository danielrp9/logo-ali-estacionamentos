import socket
from django.contrib.auth.management.commands import createsuperuser
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.conf import settings

class Command(createsuperuser.Command):
    help = 'Console de Gestão de Credenciais Logo Ali - Conformidade N02.1'

    def get_net_info(self):
        """Detecta o estado real da camada de transporte."""
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.connect(("8.8.8.8", 80))
            ip = s.getsockname()[0]
            s.close()
        except:
            ip = "127.0.0.1"

        debug_mode = getattr(settings, 'DEBUG', True)
        hsts_sec = getattr(settings, 'SECURE_HSTS_SECONDS', 0)
        
        if not debug_mode and hsts_sec > 0:
            status, color = "ESTRITO (HTTPS/HSTS)", self.style.SUCCESS
        elif not debug_mode:
            status, color = "ATIVO (HTTPS)", self.style.SUCCESS
        else:
            status, color = "DESENVOLVIMENTO (HTTP)", self.style.WARNING

        return {"ip": ip, "status": status, "style": color}

    def handle(self, *args, **options):
        n = self.get_net_info()

        # --- BANNER DE SEGURANÇA OBJETIVO ---
        self.stdout.write(self.style.SUCCESS("\n" + "═"*65))
        self.stdout.write(self.style.SUCCESS("  LOGO ALI - PROTOCOLO N02.1 | AUDITORIA DE CREDENCIAIS ADM  "))
        self.stdout.write(self.style.SUCCESS("═"*65))
        
        self.stdout.write(f"  [INTERFACE IP]: {n['ip']}")
        self.stdout.write(f"  [PROTOCOLO]:    ", ending="")
        self.stdout.write(n['style'](f"{n['status']}\n"))
        
        self.stdout.write(self.style.WARNING("POLÍTICA DE SENHAS N02.1:"))
        self.stdout.write("  • Mínimo 8 caracteres")
        self.stdout.write("  • Letras Maiúsculas, Minúsculas e Números obrigatórios")
        self.stdout.write(self.style.SUCCESS("═"*65 + "\n"))

        # Garante que o Django não oferecerá bypass
        options['validate_password'] = False
        return super().handle(*args, **options)

    def get_input_data(self, field, message, default=None):
        if field.name != 'password':
            return super().get_input_data(field, message, default)

        while True:
            val = super().get_input_data(field, message, default)
            try:
                validate_password(val)
                self.stdout.write(self.style.SUCCESS("\n[OK] Credencial aprovada. Pronto para transmissão segura."))
                return val
            except ValidationError as e:
                self.stdout.write(self.style.ERROR("\n" + "!"*65))
                self.stdout.write(self.style.ERROR("  ALERTA: VIOLAÇÃO DOS REQUISITOS DE SEGURANÇA N02.1  "))
                self.stdout.write(self.style.ERROR("!"*65))
                for msg in e.messages:
                    self.stdout.write(self.style.WARNING(f" -> {msg}"))
                self.stdout.write(self.style.NOTICE("\nRepita o procedimento respeitando a norma:\n"))