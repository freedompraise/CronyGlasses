import React from "react";

const Account = () => {
  return (
    <div className="bg-white p-4 md:p-8 mx-auto max-w-6xl mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-indigo-600 font-semibold tracking-wide uppercase">
          ACCOUNT DETAILS
        </h2>
        <button className="bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
      <hr className="w-full mb-4" />
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col w-full md:w-1/2 mb-4 md:mb-0">
          <h3 className="text-lg font-bold mb-2">Personal Information</h3>
          <p className="mb-2">
            <span className="font-bold">Name:</span> John Doe
          </p>
          <p className="mb-2">
            <span className="font-bold">Email:</span> john.doe@example.com
          </p>
          <p className="mb-2">
            <span className="font-bold">Phone:</span> +1 (555) 555-1234
          </p>
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <h3 className="text-lg font-bold mb-2">Order History</h3>
          <ul>
            <li>
              <a href="#">
                Order #12345 - Placed on 01/01/2021 - Total: $100.00
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Account;
