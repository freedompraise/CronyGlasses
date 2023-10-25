import React from "react";

const OrderCompletion = () => {
  return (
    <div className="container bg-white p-4 md:p-8 mx-auto max-w-6xl mt-8">
      <h2 className="text-2xl font-bold mb-4">Order Completed</h2>
      <p className="text-gray-500">
        Thank you for your order. Your order has been successfully placed.
      </p>
      <div className="flex justify-center mt-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
          Continue Shopping
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          View Order Details
        </button>
      </div>
    </div>
  );
};

export default OrderCompletion;
