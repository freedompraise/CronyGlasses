from .base_settings import *


ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS').split(' ')
DEBUG = os.getenv('DEBUG', '0').lower() in ['true', 't', '1']

DATABASES = {
    'default': dj_database_url.parse(os.environ.get('DATABASE_URL'), conn_max_age=600),
}

SECURE_HSTS_SECONDS = 315300 
SECURE_SSL_REDIRECT = True
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True