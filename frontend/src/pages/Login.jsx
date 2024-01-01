import React from "react";
import { useForm } from "react-hook-form";

function Login () {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem("userEmail", data.email);
    console.log("Login successful!");
    window.location.href = "/account";  
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 md:p-8 mx-auto max-w-lg my-12">
      <h2 className="text-left text-2xl font-bold mb-4">
        CUSTOMER LOGIN
      </h2>
      <hr className="w-full mb-4" />
        <label htmlFor="email" className="mb-2">
          Email:
        </label>
        <input
        {...register("email", { required: true })}
          type="email"
          id="email"
          name="email"
          className="border border-gray-400 rounded-md p-2 w-full mb-4"
          required
        />
        <div className="flex justify-between w-full">
          {" "}
          <label htmlFor="password" className="text-left mb-2">
            Password:
          </label>
          <p className="text-gray-800 font-mono ">
            Generic Password is <strong className="hover:text-blue-700" >"password"</strong>
          </p>{" "}
        </div>

        <input
          type="password"
          id="password"
          name="password"
          className="border border-gray-400 rounded-md p-2 w-full mb-4"
          value="password"
          required
        />
        <div className="flex justify-between w-full">
          <button
            type="submit"
            className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
          >
            Log In
          </button>
       
        </div>
      </form>
  );
};
export default Login;
