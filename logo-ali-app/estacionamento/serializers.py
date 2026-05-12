"""
LogoAli/Logo Ali - Serializers (Versão Vínculo Dinâmico)
Author: Daniel Rodrigues Pereira | Year: 2026
"""
from rest_framework import serializers
from .models import Veiculo, Usuario
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = Usuario
        fields = [
            'cpf', 'username', 'nome_completo', 'email', 'telefone', 
            'cidade', 'bairro', 'rua', 'numero', 'password', 'tipo_usuario'
        ]
        read_only_fields = ['tipo_usuario']

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
        # usuario agora não é read_only para permitir que o funcionário envie o ID do dono
        read_only_fields = ['horario_entrada']

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