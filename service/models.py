from django.db import models
from django.contrib.auth.models import User


class Drink(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to='images/')
    flavor = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=6, decimal_places=2)
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('submitted', 'Submitted'),
        ('fulfilled', 'Fulfilled'),
        ('canceled', 'Canceled'),
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    drink = models.ForeignKey(Drink, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.drink.name}"

    @property
    def total_price(self):
        return self.quantity * self.drink.price

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    order_items = models.ManyToManyField(OrderItem)

    def __str__(self):
        return f"{self.user}'s cart"

