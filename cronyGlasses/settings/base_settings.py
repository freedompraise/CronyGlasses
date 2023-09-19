"""
Django settings for cronyGlasses project.

"""
from pathlib import Path
import os
from dotenv import load_dotenv
import dj_database_url

# PAYPAL
PAYPAL_RECEIVER_EMAIL = os.getenv("PAYPAL_RECEIVER_EMAIL")
PAYPAL_TEST = True

DEBUG = os.getenv("DEBUG", "0").lower() in ["true", "t", "1"]
APPEND_SLASH = False
BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv()
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
SECRET_KEY = os.environ["SECRET_KEY"]
ROOT_URLCONF = "cronyGlasses.urls"
# cors headers
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWED_ORIGINS = ["http://localhost:3000", "https://cronyglasses.onrender.com"]
WSGI_APPLICATION = "cronyGlasses.wsgi.application"
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS").split(" ")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "service.apps.ServiceConfig",
    "paypal.standard.ipn",
    "sslserver",
    "corsheaders",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
]

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "django.template.context_processors.media",
            ],
        },
    },
]

# Database
if str(os.environ.get("USE_SQLITE")).lower() == "true":
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
else:
    DATABASES = {
        "default": dj_database_url.parse(
            os.environ.get("DATABASE_URL"), conn_max_age=600
        ),
    }

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = "/static/"
MEDIA_URL = "/"
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
