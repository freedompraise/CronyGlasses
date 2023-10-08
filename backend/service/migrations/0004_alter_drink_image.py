# Generated by Django 3.2.20 on 2023-10-08 05:12

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0003_orderitem_total_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='drink',
            name='image',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='image'),
        ),
    ]
