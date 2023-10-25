import React from "react";

const Checkout = () => {
  return (
    <div className="container bg-white p-4 md:p-8 mx-auto max-w-6xl mt-8">
      <div className="flex flex-row">
        <div className="w-3/5 pr-4">
          <div>
            {" "}
            <div className="mx-auto w-3/5">
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
                    placeholder="XXXX-XXXX-XXXX-XXXX"
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
                    placeholder="MM/YY"
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
                    placeholder="123"
                  />
                </div>
                {/* Add more payment form fields as needed */}
              </form>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="w-auto">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            {/* Order details go here */}
            <h3 className="text-2xl font-bold mt-4">Subtotal: $40</h3>
            <p className="text-gray-500 text-sm my-2">
              Tax and shipping calculated at checkout
            </p>
            <button className="bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
