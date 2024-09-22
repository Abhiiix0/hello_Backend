import { Modal } from "antd";
import React from "react";

const UserSearch = ({ open, close }) => {
  return (
    <div>
      <Modal open={open} onCancel={() => close(false)} footer={false}>
        <div className=" mt-7">
          <div>
            <input
              type="text"
              placeholder="Search user here..."
              className=" w-full h-8 px-2 rounded-md border md:h-10"
            />
          </div>
          <div className=" flex flex-col gap-2 mt-3">
            <div className=" border w-full h-8 md:h-10 bg-slate-200 rounded-md"></div>
            <div className=" border w-full h-8 md:h-10 bg-slate-200 rounded-md"></div>
            <div className=" border w-full h-8 md:h-10 bg-slate-200 rounded-md"></div>
            <div className=" border w-full h-8 md:h-10 bg-slate-200 rounded-md"></div>
            <div className=" border w-full h-8 md:h-10 bg-slate-200 rounded-md"></div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserSearch;
