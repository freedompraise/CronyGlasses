from django.db import models
from django.contrib.auth.models import User


class Drink(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='drink_images/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class RelatedDrink(models.Model):
    drink = models.ForeignKey(Drink, on_delete=models.CASCADE, related_name='related_drinks')
    related_drink = models.ForeignKey(Drink, on_delete=models.CASCADE, related_name='related_to')
    score = models.FloatField()

    class Meta:
        unique_together = ('drink', 'related_drink')

    def __str__(self):
        return f'{self.drink.name} related to {self.related_drink.name}'


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    drink = models.ManyToManyField(Drink, null=False)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.user.username} - {self.drink.name}"


class Order(models.Model):
    STATUS_CHOICES = (
        ('P', 'Pending'),
        ('C', 'Confirmed'),
        ('F', 'Fulfilled'),
        ('D', 'Delivered'),
        ('X', 'Cancelled'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    drinks = models.ManyToManyField(Drink, through='OrderItem')
    total = models.DecimalField(max_digits=6, decimal_places=2)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='P')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def total_price(self):
        return sum(item.drink.price * item.quantity for item in self.orderitem_set.all())

    def __str__(self):
        return f"{self.user.username} - {self.created_at.strftime('%d-%m-%Y %H:%M:%S')}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    drink = models.ForeignKey(Drink, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.order} - {self.drink.name}"
