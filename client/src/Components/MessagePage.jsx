import React, { useEffect, useRef, useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import logo from "../assets/hellobw.png";

import bgg from "./hellochattingbg.jpg";
import bgg2 from "./bg.jpg";
import { IoMdAttach } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import moment from "moment";
import uploadImg from "../cloudinary/uploadFile";
import { Modal, Spin } from "antd";
const MessagePage = () => {
  const navigate = useNavigate();
  const userId = useParams();
  const [userData, setuserData] = useState({
    name: "",
    profile_img: "",
    email: "",
    online: false,
  });
  const socketConnection = useSelector((state) => state.user.socketConnection);
  const usser = useSelector((state) => state.user);
  const [AllMessages, setAllMessages] = useState([]);
  // console.log("userId", userId.userId);
  const [imguploaderModal, setimguploaderModal] = useState(false);
  const [openOption, setopenOption] = useState(false);
  const [msg, setmsg] = useState("");
  const [uploaderLoading, setuploaderLoading] = useState(false);
  const [imgsend, setimgsend] = useState("");
  const sendMsg = async () => {
    console.log("send call");
    if (msg || imgsend) {
      if (socketConnection) {
        console.log("img url", imgsend);
        await socketConnection.emit("NewMessage", {
          sender: usser._id,
          receiver: userId.userId,
          text: msg ? msg : "",
          imageUrl: imgsend,
          videoUrl: "",
        });
        setmsg("");
        setimgsend("");
        setimguploaderModal(false);
      }
    }
  };

  const currentMsg = useRef(null);

  const handelImgUploader = async (e) => {
    setopenOption(false);
    setuploaderLoading(true);
    setimguploaderModal(true);
    const file = e.target.files[0];
    const fileee = await uploadImg(file);
    // setimgName(fileee.display_name);
    // setPreview(fileee?.url); // Set image preview
    setimgsend(fileee?.url);
    setuploaderLoading(false);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMsg();
    }
  };
  useEffect(() => {
    console.log("yo1");
    if (currentMsg.current) {
      console.log("yo");
      currentMsg?.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [AllMessages]);
  useEffect(() => {
    if (socketConnection) {
      console.log("run");
      socketConnection.emit("messagePage", userId.userId);

      socketConnection.emit("seen", userId.userId);

      socketConnection.on("messageUser", (data) => {
        if (data.success === false) {
          return navigate("pageNotFound");
        }
        setuserData(data);
      });
      socketConnection.on("prvMsg", (data) => {
        console.log("prvMsg", data);
        if (data) {
          setAllMessages([...data]);
        } else {
          setAllMessages([]);
        }
      });
      socketConnection.on("message", (data) => {
        console.log("conversation", data);
        if (
          userId.userId === data[0].msgBySender ||
          userId.userId === userId.userId
        ) {
          setAllMessages([...data]);
        }
        // currentMsg?.current
      });
    }
  }, [socketConnection, userId.userId, usser]);

  return (
    <div
      style={{
        backgroundImage: `url(${bgg2})`,

        backgroundPosition: "center", // Align logos
      }}
      className=" relative flex flex-col items-end justify-between  object-cover  border h-full"
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

      <main className=" h-[81vh] mb-1   w-full mt-1">
        <div className=" h-full mb-5 overflow-y-scroll flex flex-col gap-1 px-2 w-full">
          {AllMessages?.map((mg, i) => (
            <div
              ref={currentMsg}
              className={`bg-white shadow-md px-2 ${
                mg?.imageUrl && "pb-4"
              } w-fit max-w-[80%] rounded-md ${
                mg?.msgBySender === usser?._id && " self-end"
              }`}
            >
              <p className=" m-0 font-medium text-[15px]">{mg?.text}</p>
              {/* <p className=" m-0 font-medium text-[15px]"></p> */}
              {mg?.imageUrl && (
                <div className=" h-full  p-2 pb-0 ">
                  <img
                    src={mg?.imageUrl}
                    alt="imgsend"
                    className=" w-[250px] pt-1 rounded-md object-contain"
                  />
                </div>
              )}
              <p
                className={` text-[10px] mt-[-4px] m-0 ${
                  mg?.msgBySender === usser?._id && " text-right"
                }`}
              >
                {moment(mg?.createdAt).format("hh:mm")}
              </p>
            </div>
          ))}
        </div>
      </main>

      <div
        className={`bg-white shadow-md absolute right-[70px] bottom-[62px] rounded-md h-fit w-fit px-3 py-2 transform transition-transform duration-300 ${
          openOption ? "scale-100 " : "scale-0 "
        }`}
      >
        <input
          type="file"
          id="uploadImg"
          className=" hidden"
          onChange={(e) => handelImgUploader(e)}
        />
        <div className=" flex flex-col gap-1">
          <label
            htmlFor="uploadImg"
            className=" hover:bg-slate-200 cursor-pointer px-2 py-1 font-medium rounded-md capitalize flex items-center gap-2"
          >
            {" "}
            <FaRegImage color="#800080" size={15} /> Image
          </label>
          <p className=" hover:bg-slate-200 cursor-pointer px-2 py-1 font-medium rounded-md capitalize  flex items-center gap-2">
            {" "}
            <FaVideo color="#ffa933" size={15} />
            Video
          </p>
        </div>
      </div>
      <Modal
        open={imguploaderModal}
        closeIcon={false}
        okText="Send"
        onOk={() => sendMsg()}
        onCancel={() => {
          setimguploaderModal(false);
          setimgsend("");
        }}
      >
        <div className=" h-[250px] grid place-content-center w-full ">
          {uploaderLoading ? (
            <Spin></Spin>
          ) : (
            <img
              src={imgsend}
              alt="imgsend"
              className=" w-full object-contain h-[250px]"
            />
          )}
        </div>
      </Modal>
      <footer className=" p-2 pt-0 w-full flex items-center gap-2 justify-between">
        <div className=" shadow-lg flex gap-2 px-2 pl-4 items-center border h-12 w-full rounded-full overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Type your message..."
            value={msg}
            onChange={(e) => setmsg(e.target.value)}
            onKeyDown={handleKeyDown} // Detect "Enter" key press
            className=" h-full outline-none w-full "
          />

          <IoMdAttach
            onClick={() => setopenOption(!openOption)}
            className=" cursor-pointer"
            size={22}
          />
        </div>
        <div
          onClick={() => sendMsg()}
          className=" shadow-lg cursor-pointer bg-blue-500 h-12 w-[54px] grid place-content-center rounded-full"
        >
          <LuSendHorizonal className=" text-white cursor-pointer" size={20} />
        </div>
      </footer>
    </div>
  );
};

export default MessagePage;
