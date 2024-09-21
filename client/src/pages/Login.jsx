import React, { useState } from "react";
import hello from "../assets/Hello.png";
import hellowd from "../assets/hellobw.png";
import { Link } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import uploadImg from "../cloudinary/uploadFile";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData); // Replace this with your registration logic
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/login`;
    console.log(process.env.REACT_APP_BACKEND_URL);
    try {
      const res = await axios.post(url, formData);
      console.log(res);
      if (res.status === 200) {
        // toast
        toast.success(res?.data.message);
        setFormData({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      //   console.log(error);
      if (error.status !== 200) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div className=" h-screen bg-blue-100 flex items-center justify-center p-8">
      <Toaster position="top-right" />
      <div className="flex w-full h-[530px] max-w-5xl border bg-gray-100 rounded-lg shadow-lg">
        {/* Left Side with Messaging Design */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#46CDCF] to-[#2B8A8D] items-center justify-center p-10 rounded-l-lg">
          <div className="text-white text-center space-y-6">
            <h1 className="text-4xl font-bold">Welcome Back</h1>
            <p className="text-lg">
              {" "}
              Connect with friends, family, and colleagues. Enjoy secure,
              real-time messaging and file sharing.
            </p>
            {/* Example messaging-related illustration or icon */}
            <img
              src={hellowd}
              alt="Messaging Illustration"
              className="w-3/4 mx-auto fill-transparent"
            />
          </div>
        </div>

        {/* Right Side with Form */}
        <div className="flex w-full md:w-1/2 items-center justify-center bg-white p-8 rounded-r-lg">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              {/* Replace the src below with your actual logo */}
              {/* <img src={hello} alt="Logo" className="mx-auto h-16" /> */}
              <h2 className="text-2xl uppercase font-bold text-[#2B8A8D]">
                Login
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#46CDCF]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#46CDCF]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#46CDCF] text-white py-2 rounded-lg hover:bg-[#3BA6A7] transition duration-300"
              >
                Login
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
              Dont't have an account?{" "}
              <Link to="/register" className="text-[#46CDCF] hover:underline">
                register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
