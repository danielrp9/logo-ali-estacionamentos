"""
LogoAli/Logo Ali - URL Configuration
Author: Daniel Rodrigues Pereira
"""
import os
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Painel Administrativo
    path('admin/', admin.site.urls),
    
    # Suas rotas de API da aplicação estacionamento
    path('', include('estacionamento.urls')),
    
    # Rota para o React: 
    # (?!static|assets|admin|api) impede que o Django tente servir HTML 
    # onde deveria servir arquivos estáticos ou rotas de API
    re_path(r'^(?!static|assets|admin|api).*$', TemplateView.as_view(template_name='index.html'), name='index'),
]

# Configuração para servir arquivos estáticos do React em modo de Desenvolvimento
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    # Garante que os assets gerados pelo Vite sejam encontrados
    urlpatterns += static('/assets/', document_root=os.path.join(settings.BASE_DIR, 'static/dist/assets/'))