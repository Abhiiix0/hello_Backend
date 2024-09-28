import React, { useEffect, useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import logo from "../assets/hellobw.png";
import { IoMdAttach } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
const MessagePage = () => {
  const userId = useParams();
  const [userData, setuserData] = useState({
    name: "",
    profile_img: "",
    email: "",
    online: false,
  });
  const socketConnection = useSelector((state) => state.user.socketConnection);
  console.log("userId", userId.userId);
  // console.log(socketConnection);
  useEffect(() => {
    if (socketConnection) {
      console.log("run");
      socketConnection.emit("messagePage", userId.userId);

      socketConnection.on("messageUser", (data) => {
        console.log("userData", data);
        setuserData(data);
      });
    }
  }, [socketConnection, userId.userId]);
  const [openOption, setopenOption] = useState(false);
  return (
    <div
      // style={{
      //   backgroundImage: `url(${logo})`,
      //   backgroundSize: "50px 50px", // Adjust the size of the logo
      //   backgroundPosition: "center", // Align logos
      //   backgroundRepeat: "repeat", // Repeat the logo
      //   backgroundClip: "padding-box",
      //   backgroundOrigin: "border-box",
      //   padding: "0px",
      // }}
      className=" relative flex flex-col items-end justify-between bg-slate-200 border h-full"
    >
      <header className=" bg-white w-full flex items-center px-2 h-[59px]">
        <div className=" flex gap-3 items-center">
          <Link to="/">
            <FaChevronLeft size={15} className=" lg:hidden" />
          </Link>
          <div>
            {userData?.profile_img === "" ? (
              // <CgProfile name="User Name" glyphName={"ab"} size={25} />
              <p className=" bg-yellow-100   border-[1px] w-10 grid place-content-center capitalize h-10 rounded-full">
                {" "}
                {userData?.name.slice(0, 2)}
              </p>
            ) : (
              <img
                src={userData?.profile_img}
                className="w-10 grid place-content-center capitalize h-10 rounded-full "
                alt=""
              />
            )}
          </div>
          <div className=" ">
            <p className=" m-0 font-semibold">{userData?.name}</p>
            <p
              className={` ${
                userData?.online && " text-green-500"
              } m-0 mt-[-3px] font-normal text-[10px]`}
            >
              {userData?.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </header>
      <div
        className={`bg-white shadow-md absolute right-[70px] bottom-[62px] rounded-md h-fit w-fit px-3 py-2 transform transition-transform duration-300 ${
          openOption ? "scale-100 " : "scale-0 "
        }`}
      >
        <div className=" flex flex-col gap-1">
          <p className=" hover:bg-slate-200 cursor-pointer px-2 py-1 font-medium rounded-md capitalize flex items-center gap-2">
            {" "}
            <FaRegImage color="#800080" size={15} /> Image
          </p>
          <p className=" hover:bg-slate-200 cursor-pointer px-2 py-1 font-medium rounded-md capitalize  flex items-center gap-2">
            {" "}
            <FaVideo color="#ffa933" size={15} />
            Video
          </p>
        </div>
      </div>
      <footer className=" p-2 w-full flex items-center gap-2 justify-between">
        <div className=" flex gap-2 px-2 pl-4 items-center border h-12 w-full rounded-full overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Type your message..."
            className=" h-full outline-none w-full "
          />

          <IoMdAttach
            onClick={() => setopenOption(!openOption)}
            className=" cursor-pointer"
            size={22}
          />
        </div>
        <div className=" bg-blue-500 h-12 w-[54px] grid place-content-center rounded-full">
          <LuSendHorizonal className=" text-white cursor-pointer" size={20} />
        </div>
      </footer>
    </div>
  );
};

export default MessagePage;
