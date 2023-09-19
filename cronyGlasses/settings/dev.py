from .base_settings import *
import dj_database_url


STATICFILES_STORAGE = "django.contrib.staticfiles.storage.StaticFilesStorage"

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
