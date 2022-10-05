from django.db import models

# Create your models here.
class Drinks(models.Model):
    name = models.CharField(max_length=20, unique = True)
    type = models.CharField(max_length=20)
    size = models.CharField(max_length = 4)
