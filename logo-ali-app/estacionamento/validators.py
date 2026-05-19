import re
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import Veiculo, Usuario
from django.core.exceptions import ValidationError

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = Usuario
        fields = [
            'cpf', 'username', 'nome_completo', 'email', 'telefone', 
            'cidade', 'bairro', 'rua', 'numero', 'password', 'tipo_usuario'
        ]
        read_only_fields = ['tipo_usuario']

    def validate_cpf(self, value):
        """Normaliza o CPF removendo pontos, traços e espaços, mantendo apenas números"""
        cpf_limpo = re.sub(r'\D', '', value) # Remove tudo que não for número
        
        if len(cpf_limpo) != 11:
            raise serializers.ValidationError("O CPF deve conter exatamente 11 dígitos numéricos.")
            
        return cpf_limpo

    def create(self, validated_data):
        user = Usuario.objects.create_user(
            cpf=validated_data['cpf'],
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            nome_completo=validated_data['nome_completo'],
            telefone=validated_data['telefone'],
            cidade=validated_data['cidade'],
            bairro=validated_data['bairro'],
            rua=validated_data['rua'],
            numero=validated_data['numero'],
            tipo_usuario=Usuario.CLIENTE
        )
        return user

class VeiculoSerializer(serializers.ModelSerializer):
    usuario_detalhes = UserSerializer(source='usuario', read_only=True)
    valor_atual = serializers.SerializerMethodField()

    class Meta:
        model = Veiculo
        fields = [
            'id', 'placa', 'modelo', 'cor', 'avarias', 
            'horario_entrada', 'horario_saida', 'usuario', 'usuario_detalhes', 'valor_atual'
        ]
        read_only_fields = ['horario_entrada']

    def validate_placa(self, value):
        """Normaliza a placa para caixa alta e remove espaços ou traços (Padrão Mercosul/Antigo)"""
        placa_limpa = re.sub(r'[^A-Za-z0-9]', '', value).upper()
        
        if len(placa_limpa) != 7:
            raise serializers.ValidationError("A placa deve conter exatamente 7 caracteres alfanuméricos.")
            
        return placa_limpa

    def get_valor_atual(self, obj):
        from django.utils import timezone
        referencia_saida = obj.horario_saida if obj.horario_saida else timezone.now()
        tempo = referencia_saida - obj.horario_entrada
        horas = tempo.total_seconds() / 3600
        return round(max(1, horas) * 5, 2)

class ClienteAuditoriaSerializer(serializers.ModelSerializer):
    """Serializer para visão do Funcionário: Dados do Cliente + Seus Veículos"""
    veiculos_ativos = serializers.SerializerMethodField()

    class Meta:
        model = Usuario
        fields = [
            'cpf', 'nome_completo', 'email', 'telefone', 
            'cidade', 'bairro', 'rua', 'numero', 'veiculos_ativos'
        ]

    def get_veiculos_ativos(self, obj):
        veiculos = Veiculo.objects.filter(usuario=obj, horario_saida__isnull=True)
        return VeiculoSerializer(veiculos, many=True).data
    
class ComplexityValidator:
    def validate(self, password, user=None):
        if not re.search(r'[A-Z]', password):
            raise ValidationError("A senha deve conter pelo menos uma letra maiúscula.")
        if not re.search(r'[a-z]', password):
            raise ValidationError("A senha deve conter pelo menos uma letra minúscula.")
        if not re.search(r'[0-9]', password):
            raise ValidationError("A senha deve conter pelo menos um número.")

    def get_help_text(self):
        return "Sua senha deve conter letras maiúsculas, minúsculas e números."