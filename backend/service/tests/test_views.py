from django.test import TestCase
from django.contrib.auth import get_user_model
from .test_utils import (
    create_test_user,
    create_test_drink,
    create_test_cart,
    create_test_order_item,
    create_test_order,
)

User = get_user_model()


class ServiceViewsTestCase(TestCase):
    def setUp(self):
        self.user = create_test_user()
        self.drink = create_test_drink(
            name="Drink 1", price=1.99, description="Test Drink 1"
        )
        self.order = create_test_order(user=self.user, total=0)
        self.cart = create_test_cart(user=self.user)
        self.order_item1 = create_test_order_item(
            order=self.order, drink=self.drink, quantity=1
        )
