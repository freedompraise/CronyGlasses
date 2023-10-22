import React from "react";

function Subscribe() {
  return (
    <div
      className=""
      style={{
        backgroundColor: "rgb(63, 55, 55)",
      }}
    >
      <div className="flex flex-col items-center justify-center w-2/5 mx-auto">
        <h1 className="text-3xl font-bold mb-4">SUBSCRIBE</h1>
        <p className="text-center">
          Subscribe to our newsletter and get 10% off your first purchase
        </p>
        <input type="email" placeholder="Email" className="w-full mb-4" />
        <select className="w-full mb-4">
          <option value="American">American</option>
          <option value="African">African</option>
          <option value="Other">Other</option>
        </select>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Subscribe;
