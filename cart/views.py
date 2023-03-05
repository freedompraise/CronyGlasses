from django.shortcuts import render

# Create your views here.

@login_required
def cart(request):
    cart = request.session.get('cart', {})
    cart_items = []
    total = 0
    for drink_id, quantity in cart.items():
        drink = Drink.objects.get(id=drink_id)
        price = drink.price * quantity
        total += price
        cart_items.append({
            'id': drink_id,
            'name': drink.name,
            'image':drink.image,
            'price': drink.price,
            'quantity': quantity,
            'total_price': price,
        })

    context = {
        'cart_items': cart_items,
        'subtotal': total,
    }

    return render(request, 'service/cart.html', context)