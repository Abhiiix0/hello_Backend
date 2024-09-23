import { Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
// import searchUser from "../../../server/controller/searchUser";

const UserSearch = ({ open, close }) => {
  const [srchUsers, setsrchUsers] = useState([]);
  const [search, setSearch] = useState("");
  const searchUserFUn = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/search-user`;
      const res = await axios({
        url: url,
        method: "post",
        data: { seach: search },
        withCredentials: true,
      });
      console.log(res);
      setsrchUsers(res?.data?.user);
      //   console.log(res);
      // dispatch(setUser(res?.data?.data));
      // toast.success(res?.data?.message);
    } catch (error) {
      setsrchUsers([]);
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <Modal open={open} onCancel={() => close(false)} footer={false}>
        <div className=" mt-7">
          <div className=" flex gap-2">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user here..."
              value={search}
              className=" outline-none w-full h-8 px-2 rounded-md border md:h-10"
            />
            <button
              onClick={() => searchUserFUn()}
              className=" bg-blue-400 text-white font-semibold h-8 px-2 border rounded-md"
            >
              Search
            </button>
          </div>
          {srchUsers?.length !== 0 ? (
            <div className=" flex flex-col gap-2 h-[250px] mt-3 overflow-y-scroll">
              {srchUsers?.map((u, i) => (
                <div
                  key={i}
                  className=" flex gap-2 px-2 items-center border w-full h-16 md:h-16 bg-slate-200 rounded-md"
                >
                  <div className=" h-9 w-9 rounded-full object-contain overflow-hidden bg-white">
                    <img
                      src={u.profile_img}
                      className=" h-full w-full"
                      alt=""
                    />
                  </div>
                  <div className=" flex flex-col gap-0">
                    <p className="  m-0 text-sm">{u.name}</p>
                    <p className=" m-0 text-sm">{u.email}</p>
                  </div>
                </div>
              ))}
              {/* <div className=" border w-full h-8 md:h-10 bg-slate-200 rounded-md"></div>
              <div className=" border w-full h-8 md:h-10 bg-slate-200 rounded-md"></div>
              <div className=" border w-full h-8 md:h-10 bg-slate-200 rounded-md"></div>
              <div className=" border w-full h-8 md:h-10 bg-slate-200 rounded-md"></div> */}
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
