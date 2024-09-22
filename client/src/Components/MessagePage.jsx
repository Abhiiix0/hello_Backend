import React from "react";
import { LuSendHorizonal } from "react-icons/lu";
const MessagePage = () => {
  return (
    <div className=" p-2 flex items-end justify-end bg-red-200 border h-full">
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
