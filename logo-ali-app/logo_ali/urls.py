"""
LogoAli/Logo Ali - URL Configuration Principal
Author: Daniel Rodrigues Pereira
"""
import os
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('estacionamento.urls')),
    
    # Rota "Catch-all" para o React
    re_path(r'^(?!static|media|admin|api).*$', TemplateView.as_view(template_name='index.html'), name='index'),
]

# Configuração de estáticos para Desenvolvimento
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    # Garante acesso direto aos assets do build
    urlpatterns += static('/static/dist/assets/', document_root=os.path.join(settings.BASE_DIR, 'static/dist/assets/'))