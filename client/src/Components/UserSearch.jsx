import { Modal } from "antd";
import React, { useState } from "react";

const UserSearch = ({ open, close }) => {
  const [srchUsers, setsrchUsers] = useState([]);
  return (
    <div>
      <Modal open={open} onCancel={() => close(false)} footer={false}>
        <div className=" mt-7">
          <div>
            <input
              type="text"
              placeholder="Search user here..."
              className=" outline-none w-full h-8 px-2 rounded-md border md:h-10"
            />
          </div>
          {srchUsers?.length !== 0 ? (
            <div className=" flex flex-col gap-2 h-[250px] mt-3">
              <div className=" border w-full h-8 md:h-10 bg-slate-200 rounded-md"></div>
              <div className=" border w-full h-8 md:h-10 bg-slate-200 rounded-md"></div>
              <div className=" border w-full h-8 md:h-10 bg-slate-200 rounded-md"></div>
              <div className=" border w-full h-8 md:h-10 bg-slate-200 rounded-md"></div>
              <div className=" border w-full h-8 md:h-10 bg-slate-200 rounded-md"></div>
            </div>
          ) : (
            <div className=" items-center justify-center flex flex-col gap-2 mt-3 h-[250px]">
              <p className=" font-semibold text-xl text-gray-200">
                Search Result show here
              </p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UserSearch;
