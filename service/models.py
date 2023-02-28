from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Drink(models.Model):
    name = models.CharField(max_length=20, unique = True)
    type = models.CharField(max_length=20, blank=True)
    size = models.CharField(max_length = 5)
    price = models.IntegerField(blank=True, null = True)
    customer = models.ManyToManyField(User)
    # customers=models.ManyToManyField(User,blank=True)
    avatar = models.ImageField(null=True, blank = True)

    def __str__(self):
        return self.name

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    newsletter = models.BooleanField(default=False)

    def __str__(self):
        return self.user.first_name