"""
LogoAli/Logo Ali - Serializers
Author: Daniel Rodrigues Pereira
"""
from rest_framework import serializers
from .models import Veiculo
from django.contrib.auth.models import User
 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class VeiculoSerializer(serializers.ModelSerializer):
    usuario_detalhes = UserSerializer(source='usuario', read_only=True)
    valor_atual = serializers.SerializerMethodField()

    class Meta:
        model = Veiculo
        fields = [
            'id', 'placa', 'modelo', 'cor', 'avarias', 
            'horario_entrada', 'horario_saida', 'usuario', 'usuario_detalhes', 'valor_atual'
        ]
        read_only_fields = ['usuario', 'horario_entrada']

    def get_valor_atual(self, obj):
        from django.utils import timezone
        referencia_saida = obj.horario_saida if obj.horario_saida else timezone.now()
        tempo = referencia_saida - obj.horario_entrada
        horas = tempo.total_seconds() / 3600
        return round(max(1, horas) * 5, 2)