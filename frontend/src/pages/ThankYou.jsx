function ThankYou() {
  return (
    <div className="bg-white p-4 sm:p-8 mx-auto max-w-6xl my-16">
      <div className="flex justify-between items-center mb-4"></div>
      <hr className="w-full mb-4" />
      <div className="text-center">
        <h1 className="confirmation-heading text-2xl sm:text-3xl font-bold mb-4">
          Order Successful!
        </h1>
        <p className="text-base sm:text-lg">Your order number is: 12345</p>
        <p className="text-base sm:text-lg">
          A confirmation email has been sent to your address.
        </p>
        <p className="text-base sm:text-lg">
          You can view your order details in your account.
        </p>
        <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center mt-8 font-sans">
          <a
            className="bg-gray-800 text-white py-2 px-4 mb-2 sm:mb-0 sm:py-3 sm:px-6 rounded-lg overflow-hidden text-center hover:bg-black w-full sm:w-auto"
            href="/account"
          >
            View Order Details
          </a>

          <a
            className="text-black py-2 px-4 sm:py-3 sm:px-6 rounded-lg overflow-hidden text-center border hover:border-black w-full sm:w-auto"
            href="/"
          >
            Continue Shopping
          </a>
        </div>
      </div>
      <hr className="w-full mb-4" />
    </div>
  );
}

export default ThankYou;
