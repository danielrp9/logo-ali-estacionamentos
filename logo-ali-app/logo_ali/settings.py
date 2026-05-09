"""
LogoAli/Logo Ali - Parking Management System (Global Settings)
Author: Daniel Rodrigues Pereira | Year: 2026
Finalidade: Configurações Core com foco em Segurança de Rede e Proxy Reverso.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# Caminho base do projeto
BASE_DIR = Path(__file__).resolve().parent.parent

# Configurações básicas de ambiente via .env
SECRET_KEY = os.getenv("SECRET_KEY", "django-insecure-dev-key-change-in-production")
DEBUG = os.getenv("DEBUG", "True").lower() in ("true", "1", "t")

# Adicionado localhost e curingas para garantir acesso em ambiente offline e rede local
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "127.0.0.1,localhost,0.0.0.0").split(",")

# ==============================================================================
# CONFIGURAÇÕES DE SEGURANÇA PARA PROXY (NGINX + HTTPS)
# ==============================================================================

# 1. Reconhecimento de Protocolo: Impede Loops e Erros 502
# Fundamental para que o request.is_secure() identifique o HTTPS vindo do Nginx.
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# 2. Travas de Cookies (Conforme Norma N08.6 da PSI)
# Nota: Mantidos como False para permitir que a sessão persista ao trocar 
# da Porta 443 (Login) para a Porta 80 (Home) no ambiente de desenvolvimento.
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False

# ✅ FIX #3: Adicionar proteção HTTPONLY + SAMESITE (mesmo em dev)
SESSION_COOKIE_HTTPONLY = True  # Previne acesso via JavaScript (XSS)
CSRF_COOKIE_HTTPONLY = True     # Protege token CSRF contra leitura maliciosa
SESSION_COOKIE_SAMESITE = 'Lax' # Necessário para manter o cookie em redirecionamentos 302
CSRF_COOKIE_SAMESITE = 'Lax'

# 3. Proteções de Navegador e Integridade de Protocolo
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True

# Cabeçalho para evitar que o navegador carregue o site em frames externos (Anti-Clickjacking)
X_FRAME_OPTIONS = 'DENY'

# Redirecionamento de Referrer para manter a privacidade do usuário entre saltos de protocolo
SECURE_REFERRER_POLICY = "same-origin"

# ✅ FIX #4: HSTS (Strict-Transport-Security)
# Em desenvolvimento, mantemos desabilitado (0) para permitir que o Middleware 
# force a volta para o HTTP puro na Home, atendendo ao desafio do professor.
SECURE_HSTS_SECONDS = 0  
SECURE_HSTS_INCLUDE_SUBDOMAINS = False
SECURE_HSTS_PRELOAD = False

# ==============================================================================

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'estacionamento', 
]

MIDDLEWARE = [
    # O ProtocolEnforcer deve ser o primeiro para validar o SSL antes de qualquer processamento
    'estacionamento.middleware.ProtocolEnforcerMiddleware', 
    'corsheaders.middleware.CorsMiddleware', 
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'logo_ali.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'static/dist'),
            os.path.join(BASE_DIR, 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'logo_ali.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

# Configurações de CORS para integração fluida com o Frontend React
CORS_ALLOW_ALL_ORIGINS = True 
CORS_ALLOW_CREDENTIALS = True

# ✅ IMPORTANTE: Mantido como False para garantir paridade com as rotas do React
APPEND_SLASH = False 

# Conforme norma N02.1 da sua PSI (Gestão de Senhas)
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', 'OPTIONS': {'min_length': 8}},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internacionalização
LANGUAGE_CODE = 'pt-br'
TIME_ZONE = 'America/Sao_Paulo'
USE_I18N = True
USE_TZ = True

# Gestão de Arquivos Estáticos (WhiteNoise configurado para servir o build do React)
STATIC_URL = 'static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
    os.path.join(BASE_DIR, 'static/dist'),
]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Integração com Gateway de Pagamento (Stripe)
# Nota: Chaves sensíveis carregadas exclusivamente via variáveis de ambiente (.env)
STRIPE_PUBLIC_KEY = os.getenv('STRIPE_PUBLIC_KEY')
STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY')
STRIPE_WEBHOOK_SECRET = os.getenv('STRIPE_WEBHOOK_SECRET')