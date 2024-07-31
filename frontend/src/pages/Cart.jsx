import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../contexts/CartContext";

function Cart() {
  const { cartItems, removeFromCart, getSubTotal } = useCart();
  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };
  const calculateTotal = () => {
    return getSubTotal();
  };
  return (
    <div className="container bg-white p-4 md:p-8 mx-auto max-w-6xl mt-8">
      <h2 className="text-2xl mb-4 font-bold">SHOPPING CART</h2>
      <hr className="border-t-2 border-black mb-0" />
      <div className="mx-auto mt-0 md:flex md:space-x-8 md:px-8 py-8">
        {/* start here */}
        {cartItems.length > 0 ? (
          <>
            <div className="md:w-4/5 pr-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center my-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <button
                    className="ml-auto"
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-red-500 hover:text-red-700"
                    />
                  </button>
                </div>
              ))}
            </div>
            <div className="md:w-2/5 pl-4">
              <h3 className="text-2xl font-bold mb-4">
                Subtotal: ${calculateTotal().toFixed(2)}
              </h3>
              <p className="text-gray-500 text-sm mb-2">
                Taxes and shipping calculated at checkout
              </p>
              <div className="flex flex-col space-y-2">
                <a
                  className="bg-gray-800 text-white py-2 px-2/3 rounded-lg overflow-hidden text-center hover:bg-blue-700 "
                  href="/checkout"
                >
                  <button className="truncate">CHECKOUT</button>
                </a>
                {/* stop here */}
                <button className="bg-yellow-500 text-white py-2 px-2/3 rounded-lg overflow-hidden hover:bg-yellow-700">
                  <div className="truncate">Pay with Stripe</div>
                </button>
                <a
                  className="text-black py-2 px-2/3 rounded-lg overflow-hidden text-center border hover:border-black "
                  href="/"
                >
                  <button className="truncate">BACK TO SHOPPING</button>
                </a>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full items-center text-center flex flex-col">
            <div className="p-4 mb-4 inline-block">
              <p className="text-center text-lg">
                There are no items in your cart
              </p>
            </div>
            <a
              href="/"
              className="p-4 mb-4 w-2/3 rounded-lg border border-bg-black overflow-hidden hover:bg-gray-100 font-sans"
            >
              Continue shopping
            </a>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Cart;
