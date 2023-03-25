from django.test import TestCase
from .models import Drink

class DrinkModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Drink.objects.create(name='water', price=0.99, description='A bottle of refreshing water')

    def test_drink_name_label(self):
        drink = Drink.objects.get(id=1)
        field_label = drink._meta.get_field('name').verbose_name
        self.assertEquals(field_label, 'name')

    def test_drink_price_label(self):
        drink = Drink.objects.get(id=1)
        field_label = drink._meta.get_field('price').verbose_name
        self.assertEquals(field_label, 'price')

    def test_drink_description_label(self):
        drink = Drink.objects.get(id=1)
        field_label = drink._meta.get_field('description').verbose_name
        self.assertEquals(field_label, 'description')

    def test_drink_name_max_length(self):
        drink = Drink.objects.get(id=1)
        max_length = drink._meta.get_field('name').max_length
        self.assertEquals(max_length, 100)

    def test_drink_price_max_digits(self):
        drink = Drink.objects.get(id=1)
        max_digits = drink._meta.get_field('price').max_digits
        self.assertEquals(max_digits, 6)

    def test_drink_price_decimal_places(self):
        drink = Drink.objects.get(id=1)
        decimal_places = drink._meta.get_field('price').decimal_places
        self.assertEquals(decimal_places, 2)

    def test_drink_string_representation(self):
        drink = Drink.objects.get(id=1)
        self.assertEquals(str(drink), 'water')

    def test_drink_absolute_url(self):
        drink = Drink.objects.get(id=1)
        self.assertEquals(drink.get_absolute_url(), '/drinks/1/')
