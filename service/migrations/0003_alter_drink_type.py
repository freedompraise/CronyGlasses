# Generated by Django 4.0.3 on 2022-10-07 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0002_remove_drink_customer_drink_customer_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='drink',
            name='type',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
