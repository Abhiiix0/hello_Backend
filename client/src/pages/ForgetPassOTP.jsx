import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { LoaderIcon } from "react-hot-toast";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import hellowd from "../assets/hellobw.png";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const ForgetPassOTP = () => {
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill("")); // 6-digit OTP
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (email.includes("@")) {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/getotp`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      const result = await res.json();
      if (result.success) {
        localStorage.setItem("email", email);
        setStep(2);
        toast.success("OTP sent to your email");
      }
      if (result?.error) {
        toast.error(result?.message);
      }
      // console.log(result);
      // setStep(2);
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    if (/^\d?$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        prevInput?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleOtpSubmit = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 0) {
      toast.error("Please enter OTP");
    } else if (enteredOtp?.length < 6) {
      toast.error("OTP must be 6 digits");
    }
    const email = localStorage.getItem("email");
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/verify-otp`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, otp: otp.join("") }),
    });
    const result = await res.json();
    if (result?.success) {
      toast.success("OTP verified successfully");
      setStep(3);
    }
    if (result?.error) {
      toast.error(result?.message || "Internal server error");
    }
  };

  const handlePasswordReset = async (data) => {
    try {
      const email = localStorage.getItem("email");
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/reset-password`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: data?.password }),
      });
      if (res.status === 200) {
        const result = await res.json();
        console.log(result);
        setStep(4); // Reset flow
        localStorage.removeItem("email");
      } else {
        const result = await res.json();
        toast.error(result?.message || "Failed to reset password");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.message || error);
    }
  };

  return (
    <div className="flex relative items-center justify-center  min-h-screen bg-blue-100">
      {/* <div> */}
      <img
        src={hellowd}
        alt="Messaging Illustration"
        className="w-28 mt-2 ml-2  sm:hidden absolute left-0 top-0 mx-auto fill-transparent"
      />
      {/* </div> */}
      <div className="bg-white m-8 shadow-lg rounded-lg p-4 py-6 sm:p-8 w-full max-w-md">
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Enter Registered Email
            </h2>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-[#46CDCF] text-white rounded hover:opacity-80"
            >
              Submit
            </button>
            <div className=" grid place-content-center">
              <Link to="/login" className=" text-blue-500 w-full">
                Back to login
              </Link>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(handleOtpSubmit)} className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Enter OTP
            </h2>
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  className="w-10 h-10 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={1}
                />
              ))}
            </div>
            {errors.otp && (
              <p className="text-red-500 text-sm">{errors.otp.message}</p>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-[#46CDCF] text-white rounded hover:opacity-80"
            >
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form
            onSubmit={handleSubmit(handlePasswordReset)}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Reset Password
            </h2>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                className={`w-full p-2  pr-9 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 ${
                  errors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
                }`}
              />
              <div
                className="absolute top-3  right-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={`w-full pr-9 p-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-[#46CDCF] text-white rounded hover:opacity-80"
            >
              Reset Password
            </button>
          </form>
        )}
        {step === 4 && (
          <div className="flex flex-col items-center space-y-4 text-center">
            <AiOutlineCheckCircle className="text-green-500 text-6xl" />
            <h2 className="text-2xl font-bold text-gray-800">
              Password Reset Successful
            </h2>
            <p className="text-gray-600">
              Your password has been reset successfully. You can now log in with
              your new password.
            </p>
            <Link
              to="/login"
              className="w-full sm:w-auto py-2 px-4 bg-[#46CDCF] text-white rounded hover:opacity-80 transition-all"
            >
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassOTP;
