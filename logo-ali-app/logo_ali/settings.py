import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv("SECRET_KEY", "django-insecure-dev-key-change-in-production")
DEBUG = os.getenv("DEBUG", "True").lower() in ("true", "1", "t")

ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "127.0.0.1,localhost,0.0.0.0").split(",")

# ==============================================================================
# CONFIGURAÇÕES DE SEGURANÇA PARA PROXY (NGINX + HTTPS) 
# ==============================================================================

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Mantidos como False para compatibilidade com ambiente local/desenvolvimento via Proxy
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False

SESSION_COOKIE_HTTPONLY = True  
CSRF_COOKIE_HTTPONLY = True    
SESSION_COOKIE_SAMESITE = 'Lax' 
CSRF_COOKIE_SAMESITE = 'Lax'

SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
SECURE_REFERRER_POLICY = "same-origin"

SECURE_HSTS_SECONDS = 0  
SECURE_HSTS_INCLUDE_SUBDOMAINS = False
SECURE_HSTS_PRELOAD = False

# ==============================================================================
# CONFORME NORMA N01.6: GESTÃO DE SESSÃO (TIME-OUT)
# ==============================================================================
# Sessões inativas por mais de 15 minutos (900 segundos) são encerradas.
SESSION_COOKIE_AGE = 900 
SESSION_SAVE_EVERY_REQUEST = True  # Reinicia a contagem a cada interação do usuário
SESSION_EXPIRE_AT_BROWSER_CLOSE = True 

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
    'axes',             # Para Norma N02.4 (Bloqueio de Brute Force)
    'estacionamento', 
]

MIDDLEWARE = [
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
    'axes.middleware.AxesMiddleware', # Necessário para Norma N02.4
]

# ==============================================================================
# CONFORME NORMA N02.4: BLOQUEIO DE TENTATIVAS (BRUTE FORCE)
# ==============================================================================
AUTHENTICATION_BACKENDS = [
    'axes.backends.AxesBackend', 
    'django.contrib.auth.backends.ModelBackend',
]

# O desbloqueio deve ser feito manualmente no Django Admin (Norma N02.4)
AXES_FAILURE_LIMIT = 5            
AXES_LOCK_OUT_AT_FAILURE = True   
AXES_ONLY_USER_FAILURES = True    
AXES_RESET_ON_SUCCESS = True     
# ==============================================================================

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

CORS_ALLOW_ALL_ORIGINS = True 
CORS_ALLOW_CREDENTIALS = True
APPEND_SLASH = False 

# ==============================================================================
# CONFORME NORMA N02.1: COMPLEXIDADE DE SENHAS
# ==============================================================================
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {'min_length': 8}, 
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
    # Validador personalizado para garantir Maiúsculas, Minúsculas e Números
    {
        'NAME': 'estacionamento.validators.ComplexityValidator',
    },
]
# ==============================================================================

LANGUAGE_CODE = 'pt-br'
TIME_ZONE = 'America/Sao_Paulo'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
    os.path.join(BASE_DIR, 'static/dist'),
]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

STRIPE_PUBLIC_KEY = os.getenv('STRIPE_PUBLIC_KEY')
STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY')
STRIPE_WEBHOOK_SECRET = os.getenv('STRIPE_WEBHOOK_SECRET')