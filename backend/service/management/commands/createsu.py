# images/management/commands/createsu.py

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
import os
from dotenv import load_dotenv

load_dotenv()


class Command(BaseCommand):
    help = "Creates a superuser."

    def handle(self, *args, **options):
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser(
                username=os.getenv("admin_username"),
                password=os.getenv("admin_password"),
            )
        print("Superuser has been created.")
