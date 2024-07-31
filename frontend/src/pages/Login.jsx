import { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem("userEmail", data.email);
    toast.success("Logged in successfully");
    window.location.href = "/account";
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 md:p-8 mx-auto max-w-lg my-12"
    >
      <h2 className="text-left text-2xl font-bold mb-4">CUSTOMER LOGIN</h2>
      <hr className="w-full mb-4" />
      <label htmlFor="email" className="mb-2">
        Email:
      </label>
      <input
        {...register("email", { required: true })}
        type="email"
        id="email"
        name="email"
        defaultValue={"johndoe@gmail.com"}
        className="border border-gray-400 rounded-md p-2 w-full mb-4"
        required
      />
      <div className="flex justify-between w-full">
        <label htmlFor="password" className="text-left mb-2">
          Password:
        </label>
        <div className="flex items-center">
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="focus:outline-none"
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="text-gray-600"
            />
          </button>
        </div>
      </div>
      <input
        {...register("password", { required: true })}
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"
        className="border border-gray-400 rounded-md p-2 w-full mb-4"
        defaultValue={"password"}
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
}

export default Login;
