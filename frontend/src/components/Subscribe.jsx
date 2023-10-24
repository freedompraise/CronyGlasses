import React from "react";

function Subscribe() {
  return (
    <div
      className=""
      style={{
        backgroundColor: "rgb(140, 140, 140)",
      }}
    >
      <div className="flex flex-col items-center justify-center w-2/5 mx-auto">
        <h1 className="text-3xl font-bold mb-4">SUBSCRIBE</h1>
        <p className="text-center pb-4 ">
          Subscribe to our newsletter and get 10% off your first purchase
        </p>
        <input
          type="email"
          placeholder="Enter your email address..."
          className="w-full mb-4 h-8"
        />
        <select className="w-full mb-4">
          <option value="American">American</option>
          <option value="African">African</option>
          <option value="Other">Other</option>
        </select>
        <button className="bg-black hover:bg-black text-white font-bold py-2 w-full mb-4 rounded">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Subscribe;
