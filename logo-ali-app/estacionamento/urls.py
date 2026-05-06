"""
Logo Ali Estacionamentos - URL Configuration Completo
Author: Daniel Rodrigues Pereira
Year: 2026
"""

from django.urls import path
from . import views

app_name = 'estacionamento'

urlpatterns = [
    # ==========================================
    # ROTAS DE TEMPLATES (TRADICIONAIS) - PREFIXO ADICIONADO PARA EVITAR CONFLITO
    # ==========================================
    path('old-v1/', views.adicionar_veiculo, name='adicionar_veiculo'), 
    path('old-v1/lista/', views.lista_veiculos, name='lista_veiculos'), 
    path('old-v1/pagamento/<int:veiculo_id>/', views.tela_pagamento, name='tela_pagamento'), 
    path('old-v1/adicionar/', views.adicionar_veiculo, name='adicionar_veiculo_v2'),
    path('old-v1/saida/<int:veiculo_id>/', views.registrar_saida, name='registrar_saida'),
    path('old-v1/pagamento-concluido/<int:veiculo_id>/', views.pagamento_concluido, name='pagamento_concluido'),
    path('old-v1/historico/', views.historico_veiculos, name='historico'),

    # ==========================================
    # ROTAS DE API (PARA O REACT / VITE)
    # ==========================================
    # Autenticação
    path('api/login/', views.LoginUsuarioAPI.as_view(), name='api_login'),
    
    # Gestão de Veículos
    path('api/veiculos/', views.ListaVeiculosAPI.as_view(), name='api_lista_veiculos'),
    path('api/veiculos/adicionar/', views.AdicionarVeiculoAPI.as_view(), name='api_adicionar_veiculo'),
    
    # ROTA DE HISTÓRICO COMPLETO 
    path('api/veiculos/historico/', views.HistoricoVeiculosAPI.as_view(), name='api_historico_veiculos'),
    
    # Fluxo de Pagamento Stripe e Auditoria
    path('api/pagamento/checkout/<int:veiculo_id>/', views.CriarSessaoPagamentoAPI.as_view(), name='api_stripe_checkout'),
    path('api/pagamento/confirmar/<int:veiculo_id>/', views.ConfirmarSaidaAPI.as_view(), name='api_confirmar_saida'),
]