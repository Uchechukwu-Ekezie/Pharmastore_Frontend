import React, { useState } from "react";
import loginIcons from '../assest/banner/signin.gif'; // Fixed the typo in the path
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageToBase64";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev) => ({
      ...prev,
      profilePic: imagePic,
    }));
  };

  const handleSubmit = async(e) =>{
    e.preventDefault()

    if(data.password === data.confirmPassword){

      const dataResponse = await fetch(SummaryApi.signUP.url,{
          method : SummaryApi.signUP.method,
          headers : {
              "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
  
        const dataApi = await dataResponse.json()

        if(dataApi.success){
          toast.success(dataApi.message)
          navigate("/login")
        }

        if(dataApi.error){
          toast.error(dataApi.message)
        }
  
    }else{
      toast.error("Please check password and confirm password")
    }

}

  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
          <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque ipsa culpa autem, at itaque nostrum!
          </p>
        </div>

        <form  className="max-w-md mt-8 mb-0 space-y-6">
          <div className="relative w-20 h-20 mx-auto overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcons} alt="Profile" className="object-cover w-full h-full" />
            </div>
            <label className="absolute bottom-0 w-full pt-2 pb-4 text-xs text-center cursor-pointer bg-opacity-80 bg-slate-200">
              Upload Photo
              <input
                type="file"
                className="hidden"
                onChange={handleUploadPic}
              />
            </label>
          </div>
          </form>

          <form onSubmit={handleSubmit} className="max-w-md mt-8 mb-0 space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-left text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleOnChange}
              value={data.name}
              required
              className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-left text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleOnChange}
              value={data.email}
              required
              className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-left text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter password"
                name="password"
                required
                onChange={handleOnChange}
                value={data.password}
              />
              <span
                className="absolute inset-y-0 grid px-4 cursor-pointer end-0 place-content-center"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-left text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Confirm password"
                name="confirmPassword"
                required
                onChange={handleOnChange}
                value={data.confirmPassword}
              />
              <span
                className="absolute inset-y-0 grid px-4 cursor-pointer end-0 place-content-center"
                onClick={() => setShowConfirmPassword(prev => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Have an account?
              <Link
                className="text-red-500 hover:underline hover:text-red-700"
                to="/login"
              >
                Login
              </Link>
            </p>

            <button
              type="submit"
              className="inline-block px-5 py-3 text-sm font-medium text-white bg-teal-600 rounded-lg hover:scale-110"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>

      <div className="relative w-full h-64 sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          className="absolute inset-0 object-cover w-full h-full"
        />
      </div>
      
    </section>
  );
}

export default Signup;
