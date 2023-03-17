from django.db import models
from django.contrib.auth.models import User


class Drink(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to='images/')
    flavor = models.CharField(max_length=100, blank =True, null=True)

    def __str__(self):
        return self.name


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    order_items = models.ManyToManyField('OrderItem')

    def __str__(self):
        return f"{self.user}'s cart"


class OrderItem(models.Model):
    order = models.ForeignKey('Order', null=True, blank=True, on_delete=models.CASCADE)
    drink = models.ForeignKey(Drink, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    ordered = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.quantity} of {self.drink.name}"

    @property
    def total_price(self):
        return self.quantity * self.drink.price


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    items = models.ManyToManyField('OrderItem', related_name='orders')
    total = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.user}'s order"
