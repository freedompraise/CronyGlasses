# Generated by Django 4.1.6 on 2023-02-28 12:23

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Drink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, unique=True)),
                ('type', models.CharField(blank=True, max_length=20)),
                ('size', models.CharField(max_length=5)),
                ('price', models.IntegerField(blank=True, null=True)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='')),
                ('customer', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
