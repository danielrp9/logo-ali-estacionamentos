"""
Logo Ali Estacionamentos - models.py
"""
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Veiculo(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='veiculos')
    placa = models.CharField(max_length=7) 
    modelo = models.CharField(max_length=50)
    cor    = models.CharField(max_length=20)
    avarias = models.TextField(blank=True)
    horario_entrada = models.DateTimeField(default=timezone.now)
    horario_saida   = models.DateTimeField(null=True, blank=True)

    def __str__(self):""" 
        return f"{self.modelo} - {self.placa}" """