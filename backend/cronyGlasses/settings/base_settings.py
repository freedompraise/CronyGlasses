from pathlib import Path
import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

load_dotenv()

# PAYPAL
PAYPAL_RECEIVER_EMAIL = os.getenv("PAYPAL_RECEIVER_EMAIL")
PAYPAL_TEST = True

DEBUG = os.getenv("DEBUG", "0").lower() in ["true", "t", "1"]

BASE_DIR = Path(__file__).resolve().parent.parent.parent

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]

CORS_ALLOW_ALL_ORIGINS = True

ACCESS_CONTROL_ALLOW_ORIGIN = "*"

ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "service",
    "paypal.standard.ipn",
    "sslserver",
    "corsheaders",
    "rest_framework",
    "rest_framework_simplejwt",
    "cloudinary",
    "cloudinary_storage",
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
]
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": {
        "rest_framework_simplejwt.authentication.JWTAuthentication"
    }
}

SIMPLE_JWT = {
    "SIGNING_KEY": "cronyGlasses",
    "ALGORITHM": "HS256",
    "AUTH_HEADER_TYPES": ("Bearer",),
}

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "django.template.context_processors.media",
            ],
        },
    },
]

# Database
cred = credentials.Certificate(os.getenv("DATABASE_URL"))
if str(os.environ.get("USE_SQLITE")).lower() == "true":
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
else:
    firebase_admin.initialize_app(cred, {"databaseURL": os.getenv("DATABASE_URL")})
    # DATABASES = {
    #     "default": {
    #         "ENGINE": "django.db.backends.mysql",
    #         "NAME": os.getenv("DATABASE_NAME"),
    #         "USER": os.getenv("DATABASE_USER"),
    #         "PASSWORD": os.getenv("DATABASE_PASSWORD"),
    #         "HOST": os.getenv("DATABASE_HOST"),
    #         "PORT": os.getenv("DATABASE_PORT"),
    #     }
    # }

    ref = db.reference("/")

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

CLOUDINARY_STORAGE = {
    "CLOUD_NAME": os.getenv("CLOUD_NAME"),
    "API_KEY": os.getenv("API_KEY"),
    "API_SECRET": os.getenv("API_SECRET"),
}

DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"

MEDIA_URL = "/media/"

ROOT_URLCONF = "cronyGlasses.urls"
