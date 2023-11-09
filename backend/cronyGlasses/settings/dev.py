from .base_settings import *

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "http")
APPEND_SLASH = True
SECURE_SSL_REDIRECT = False
USE_HTTPS = False
SCHEME = "https://" if USE_HTTPS else "http://"
SECRET_KEY = os.environ.get("SECRET_KEY")
