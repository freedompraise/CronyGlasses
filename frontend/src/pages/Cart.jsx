import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Drink 1",
      price: 10.0,
      quantity: 2,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Drink 2",
      price: 15.0,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
    // Add more items as needed
  ];

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const hasItemsInCart = cartItems.length > 0;

  return (
    <div className="container bg-white p-4 md:p-8 mx-auto max-w-6xl mt-8">
      <h2 className="text-2xl mb-4 font-bold">SHOPPING CART</h2>
      <hr className="border-t-2 border-black mb-0" />
      <div className="mx-auto mt-0 px-20 py-20 flex">
        <div className="w-3/5 pr-4">
          {hasItemsInCart ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center my-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <button
                  className="ml-auto"
                  // onClick={() => handleRemoveFromCart(item.id)}
                >
                  <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                </button>
              </div>
            ))
          ) : (
            <div className="w-16 h-16 rounded-full border-2 border-gray-500 flex items-center justify-center mx-auto">
              <p className="text-gray-500 text-center">
                There are no items in your cart
              </p>
            </div>
          )}
        </div>
        <div className="w-2/5 pl-4">
          <h3 className="text-2xl font-bold">
            Subtotal: ${subtotal.toFixed(2)}
          </h3>
          <p className="text-gray-500 text-sm my-2">
            Tax and shipping calculated at checkout
          </p>
          <div className="flex flex-col space-y-2 my-4">
            <button className="bg-blue-500 text-white py-2 px-2/3 rounded-lg overflow-hidden ">
              <div className="truncate"> Checkout</div>
            </button>
            <button className="bg-yellow-500 text-white py-2 px-2/3 rounded-lg overflow-hidden">
              <div className="truncate">Pay with PayPal</div>
            </button>
            <button className="border border-gray-500 text-gray-500 px-2/3 py-2 rounded-lg overflow-hidden ">
              <div className="truncate">Continue Shopping</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
