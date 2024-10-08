import React, { useState } from "react";
import hellowd from "../assets/hellobw.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { setToken } from "../redux/userSlice";
import { Input } from "antd";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      const res = await axios({
        method: "post",
        withCredentials: true,
        url,
        data: formData,
      });
      console.log("login page", res);
      if (res.status === 200) {
        dispatch(setToken(res?.data?.token));
        localStorage.setItem("token", res?.data?.token);
        toast.success(res?.data?.message);
        setFormData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      //   console.log(error);
      if (error?.status !== 200) {
        toast.error(error?.response?.data?.message);
      }
    }
  };
  return (
    <div className=" h-screen bg-blue-100 relative flex items-center justify-center p-8">
      <div className="flex w-full sm:h-[530px] max-w-5xl border bg-gray-100 rounded-lg shadow-lg">
        <img
          src={hellowd}
          alt="Messaging Illustration"
          className="w-28 mt-2 ml-2  sm:hidden absolute left-0 top-0 mx-auto fill-transparent"
        />
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
        <div className="flex w-full md:w-1/2 items-center justify-center bg-white p-8 rounded-lg sm:rounded-r-lg">
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
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg "
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                {/* <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#46CDCF]"
                /> */}
                <Input.Password
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  required
                  // placeholder="input password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg "
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
