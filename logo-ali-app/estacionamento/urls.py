from django.urls import path
from . import views

app_name = 'estacionamento'

urlpatterns = [
    # ==========================================
    # ROTAS DE TEMPLATES (TRADICIONAIS / LEGACY V1)
    # ==========================================
    path('old-v1/', views.lista_veiculos, name='lista_veiculos_root'), 
    path('old-v1/lista/', views.lista_veiculos, name='lista_veiculos'), 
    path('old-v1/pagamento/<int:veiculo_id>/', views.tela_pagamento, name='tela_pagamento'), 
    path('old-v1/adicionar/', views.adicionar_veiculo, name='adicionar_veiculo'),
    path('old-v1/saida/<int:veiculo_id>/', views.registrar_saida, name='registrar_saida'),
    path('old-v1/pagamento-concluido/<int:veiculo_id>/', views.pagamento_concluido, name='pagamento_concluido'),
    path('old-v1/historico/', views.historico_veiculos, name='historico'),

    # ==========================================
    # ROTAS DE API (PARA O FRONTEND REACT / VITE)
    # ==========================================
    
    # Autenticação e Registro
    path('api/login/', views.LoginUsuarioAPI.as_view(), name='api_login'),
    path('api/register/', views.RegistrarUsuarioAPI.as_view(), name='api_register'),
    
    # Gestão de Veículos (CRUD e Monitoramento)
    path('api/veiculos/', views.ListaVeiculosAPI.as_view(), name='api_lista_veiculos'),
    path('api/veiculos/adicionar/', views.AdicionarVeiculoAPI.as_view(), name='api_adicionar_veiculo'),
    path('api/veiculos/historico/', views.HistoricoVeiculosAPI.as_view(), name='api_historico_veiculos'),
    
    # Gestão de Usuários e Auditoria (Privativo para Funcionários/Admins)
    path('api/clientes/', views.ListaClientesAPI.as_view(), name='api_lista_clientes'),
    path('api/usuarios/promover/<str:cpf>/', views.PromoverUsuarioAPI.as_view(), name='api_promover_usuario'),
    
    # Fluxo de Pagamento Stripe e Auditoria Digital
    path('api/pagamento/checkout/<int:veiculo_id>/', views.CriarSessaoPagamentoAPI.as_view(), name='api_stripe_checkout'),
    path('api/pagamento/confirmar/<int:veiculo_id>/', views.ConfirmarSaidaAPI.as_view(), name='api_confirmar_saida'),
]