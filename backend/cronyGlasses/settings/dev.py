from .base_settings import *
import dj_database_url

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "http")
APPEND_SLASH = True
SECURE_SSL_REDIRECT = False
USE_HTTPS = False
SCHEME = "https://" if USE_HTTPS else "http://"
