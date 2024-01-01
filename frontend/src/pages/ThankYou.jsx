import React from 'react';

// Import necessary styling components or libraries

function OrderConfirmation() {
  return (
    <div className="bg-white p-4 sm:p-8 mx-auto max-w-6xl my-16">
      <div className="flex justify-between items-center mb-4">
      </div>
      <hr className="w-full mb-4" />
      <div className="text-center">
        <h1 className="confirmation-heading text-2xl font-bold mb-4">Order Successful!</h1>
        <p>Your order number is: 12345</p>
        <p>A confirmation email has been sent to your address. </p>
        <p>You can view your order details in your account.</p>
        <div className="flex flex-col mx-auto text-white w-1/5 mt-8 font-sans">
            <a className='bg-gray-800 text-white py-2 px-2/3 mb-2 sm:mb-1 rounded-lg overflow-hidden text-center hover:bg-black' href= "/account"> <button className="">View Order Details</button></a>
         
          <a
                  className="text-black py-2 px-2/3 rounded-lg overflow-hidden text-center border hover:border-black "
                  href="/"
                >
                  <button className="truncate">Continue Shopping</button>
                </a>
        </div>
      </div>
      <hr className="w-full mb-4" />
    </div>
  );
}

export default OrderConfirmation;
