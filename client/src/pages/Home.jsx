import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  logout,
  setOnlineUser,
  setSocketConnection,
  setUser,
} from "../redux/userSlice";
import Slider from "../Components/Slider";
import hello from "../assets/hellobw.png";
import { io } from "socket.io-client";
// import UserDetailsEdit from "../Components/userDetailsEdit";
const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserData = async () => {
    //fetch data from API
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
    try {
      const res = await axios({
        url,
        withCredentials: true,
      });
      // console.log(res);
      if (res?.data?.data?.logout) {
        // console.log("hii");
        // toast.error(res?.data.data.message);
        dispatch(logout());
        navigate("/login");
        return;
      }
      // toast.success(res?.data?.message);
      dispatch(setUser(res?.data?.data));

      // console.log("by");
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });
    socketConnection.on("onlineUser", (data) => {
      // console.log(data);
      dispatch(setOnlineUser(data));
    });

    dispatch(setSocketConnection(socketConnection));

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  // console.log(location);
  const baseofMsg = location.pathname === "/";
  // console.log(baseofMsg);
  return (
    <div className=" grid lg:grid-cols-[300px,1fr] h-full">
      <section className={`bg-white ${!baseofMsg && "hidden"} lg:block`}>
        <Slider />
      </section>
      <section className={`  ${baseofMsg && "hidden"} `}>
        <Outlet></Outlet>
      </section>
      {baseofMsg && (
        <div className="   hidden lg:grid place-content-center h-full w-full">
          <img src={hello} className=" w-[500px]" alt="" />
        </div>
      )}
    </div>
  );
};

export default Home;
