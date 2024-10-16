import React, { useState } from "react";
import hello from "../assets/Hello.png";
import hellowd from "../assets/hellobw.png";
import { Link, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import uploadImg from "../cloudinary/uploadFile";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Input } from "antd";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_img: "", // Adding profilePic state
  });

  const [preview, setPreview] = useState(null); // State for image preview
  const [imgName, setimgName] = useState("Choose File");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const fileee = await uploadImg(file);
    setimgName(fileee.display_name);
    setPreview(fileee?.url); // Set image preview
    setFormData({ ...formData, profile_img: fileee?.url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData?.password?.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/register`;
    try {
      const res = await axios.post(url, formData);
      // console.log(res);
      if (res.status === 201) {
        toast.success(res?.data?.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          profile_img: "",
        });
        setPreview(null);
        setimgName("Choose File");
        // navigate("/login");
      }
    } catch (error) {
      //   console.log(error);
      if (error.status !== 200) {
        toast.error(error?.response?.data?.message || "Something went wrrong");
      }
    }
  };

  return (
    <div className=" h-screen bg-blue-100 flex items-center justify-center p-8">
      <div className="flex w-full h-[530px] max-w-5xl border bg-gray-100 rounded-lg shadow-lg">
        <img
          src={hellowd}
          alt="Messaging Illustration"
          className="w-28 mt-2 ml-2  sm:hidden absolute left-0 top-0 mx-auto fill-transparent"
        />
        {/* Left Side with Messaging Design */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#46CDCF] to-[#2B8A8D] items-center justify-center p-10 rounded-l-lg">
          <div className="text-white text-center space-y-6">
            <h1 className="text-4xl font-bold">Stay Connected</h1>
            <p className="text-lg">
              Join our messaging platform and connect with your friends in
              real-time.
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
                Create an Account
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  // autoComplete={false}

                  className="w-full px-4 py-2 border border-gray-300 rounded-lg "
                />
              </div>
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
                <Input.Password
                  // type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg "
                />
              </div>
              {/* Profile Picture Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <div className=" flex items-center justify-center gap-2 h-fit ">
                  <label
                    htmlFor="profilePic"
                    // id="profilePic"
                    className=" cursor-pointer border rounded-md grid place-content-center h-11 w-full text-sm font-medium text-gray-700"
                  >
                    <div>{imgName}</div>
                  </label>
                  <input
                    type="file"
                    id="profilePic"
                    name="profilePic"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 bg-gray-200 hidden border h-12  place-content-center rounded-lg focus:outline-none focus:border-[#46CDCF]"
                  />
                  {preview && (
                    <div className="  flex relative">
                      <div
                        className=" cursor-pointer absolute top-0 right-0 bg-red-400 text-white rounded-full text-[8px] px-[2px]"
                        onClick={() => {
                          setPreview("");
                          setimgName("Choose file");
                        }}
                      >
                        {/* <CloseOutlined/> */}
                        <CloseOutlined />
                      </div>
                      <img
                        src={preview}
                        alt="Profile Preview"
                        className="h-[43px] w-[51px] rounded-full object-cover mx-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#46CDCF] text-white py-2 rounded-lg hover:bg-[#3BA6A7] transition duration-300"
              >
                Register
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-[#46CDCF] hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
