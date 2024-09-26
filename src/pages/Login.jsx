import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/store");
      fetchUserDetails();
      fetchUserAddToCart();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };
  console.log("data login", data);

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Welcome Back!</h1>
          <p className="mt-4 text-gray-500">
            Please enter your login details to access your account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto mt-8 mb-0 space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-left text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                onChange={handleOnChange}
                value={data.email}
                className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-left text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter password"
                name="password"
                onChange={handleOnChange}
                value={data.password}
              />
              <span
                className="absolute inset-y-0 grid px-4 cursor-pointer end-0 place-content-center"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div>
            <Link
              className="text-sm text-gray-500 hover:underline hover:text-red-600"
              to="/forgotpassword"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              No account?
              <Link
                className="text-red-500 hover:underline hover:text-red-700"
                to="/store/sign-up"
              >
                Sign up
              </Link>
            </p>

            <button
              type="submit"
              className="inline-block px-5 py-3 text-sm font-medium text-white bg-teal-600 rounded-lg hover:scale-110"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      <div className="relative w-full h-64 sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Login"
          src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          className="absolute inset-0 object-cover w-full h-full"
        />
      </div>
    </section>
  );
}

export default Login;
