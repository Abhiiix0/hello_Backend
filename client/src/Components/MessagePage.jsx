import React from "react";
import { LuSendHorizonal } from "react-icons/lu";
import logo from "../assets/hellobw.png";
const MessagePage = () => {
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
      className=" p-2 flex items-end justify-end bg-slate-200 border h-full"
    >
      <div className=" flex gap-2 px-4 items-center border h-12 w-full rounded-full overflow-hidden bg-white">
        <input
          type="text"
          placeholder="Type your message..."
          className=" h-full outline-none w-full "
        />
        <LuSendHorizonal className=" cursor-pointer" size={25} />
      </div>
    </div>
  );
};

export default MessagePage;
