# Generated by Django 4.1.6 on 2023-03-18 06:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0002_alter_orderitem_unique_together'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='total',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6, null=True),
        ),
    ]
