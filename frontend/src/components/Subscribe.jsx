import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Subscribe() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const handleSubscribe = () => {
    setTimeout(() => {
      setIsSubscribed(true);
    }, 1000);
  };
  const { register, handleSubmit } = useForm();

  return (
    <form
      id="subscriptionForm"
      className=""
      onSubmit={handleSubmit(handleSubscribe)}
      style={{
        backgroundColor: "rgb(140, 140, 140)",
      }}
    >
      <div className="flex flex-col mt-6 items-center justify-center w-2/5 mx-auto">
        <h1 className="text-center font-bold mt-2 text-lg uppercase mb-4">
          SUBSCRIBE
        </h1>
        <p className="text-center pb-4 ">
          Subscribe to our newsletter and get 10% off your first purchase
        </p>
        {isSubscribed ? (
          <p className="text-center text-lg mb-4 font-semibold font-mono text-white-500">
            You're successfully subscribed!
          </p>
        ) : (
          <div>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@gmail.com"
              className="border border-gray-400 rounded-md p-2 w-full mb-4"
              required
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
        )}
      </div>
    </form>
  );
}

export default Subscribe;
