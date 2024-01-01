import React from "react";
import { useCart } from "../CartContext";
import { useForm } from "react-hook-form";

function Checkout () {
 const subTotal = useCart().getSubTotal().toFixed(2);
 const {handleSubmit} = useForm();
 const onSubmit = () => {
  localStorage.removeItem("cart");
  window.location.href = "/thank-you";
 }

  return (
    <div className="container bg-white p-4 md:p-8 mx-auto max-w-6xl mt-8">
      <div className="flex flex-row">
        <div className="w-3/5 pr-4">
          <div>
            {" "}
            <div className="mx-auto px-4 sm:px-8">
              <h2 className="text-2xl font-bold mb-4">Payment Form</h2>
              <form>
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="cardNumber"
                  >
                    Card Number:
                  </label>
                  <input
                    className="border border-gray-400 rounded-md p-2 w-full"
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value="1234-5678-9876-5432"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="expiration"
                  >
                    Expiration Date:
                  </label>
                  <input
                    className="border border-gray-400 rounded-md p-2 w-full"
                    type="text"
                    id="expiration"
                    name="expiration"
                    value="12/2025"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2" htmlFor="cvv">
                    CVV:
                  </label>
                  <input
                    className="border border-gray-400 rounded-md p-2 w-full"
                    type="text"
                    id="cvv"
                    name="cvv"
                    value="123"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <div className="w-auto">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            {/* Order details go here */}
            <h3 className="text-2xl font-bold mt-4">Subtotal: ${subTotal}</h3>
            <p className="text-gray-500 text-sm my-2">
              Tax and shipping calculated at checkout
            </p>
            <button type="submit" className="bg-gray-800 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
