import React from "react";

const Register = () => {
  return (
    <div className="bg-white p-4 md:p-8 mx-auto max-w-lg mt-8">
      <h2 className="text-left text-lg font-bold uppercase mb-4">
        CREATE ACCOUNT
      </h2>
      <hr className="w-full mb-4" />
      <form className="flex flex-col items-left">
        <label htmlFor="first-name" className="mb-2">
          First Name:
        </label>
        <input
          type="text"
          id="first-name"
          name="first-name"
          className="border border-gray-400 rounded-md p-2 w-full mb-4"
          required
        />
        <label htmlFor="last-name" className="mb-2">
          Last Name:
        </label>
        <input
          type="text"
          id="last-name"
          name="last-name"
          className="border border-gray-400 rounded-md p-2 w-full mb-4"
          required
        />
        <label htmlFor="email" className="mb-2">
          Email:
        </label>
        <input
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
          <a href="#" className="text-blue-500 hover:text-blue-700">
            Forgot your password?
          </a>{" "}
        </div>

        <input
          type="password"
          id="password"
          name="password"
          className="border border-gray-400 rounded-md p-2 w-full mb-4"
          required
        />
        <div className="flex justify-between w-full">
          <button
            type="submit"
            className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
          >
            Log In
          </button>
          <p className="mt-8 text-center">
            New Customer?{" "}
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
export default Register;
