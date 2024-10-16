import { Modal, Spin } from "antd";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
// import searchUser from "../../../server/controller/searchUser";

const UserSearch = ({ open, close }) => {
  const [srchUsers, setsrchUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const searchUserFUn = async () => {
    try {
      setisLoading(true);
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/search-user`;
      const res = await axios({
        url: url,
        method: "post",
        data: { search: search },
        withCredentials: true,
      });
      // console.log(res);
      setsrchUsers(res?.data?.user);
      setisLoading(false);
    } catch (error) {
      setsrchUsers([]);
      toast.error("Something went wrong");
      setisLoading(false);
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
              className=" outline-none w-full  px-2 rounded-md border h-10"
            />
            <button
              onClick={() => searchUserFUn()}
              className=" bg-blue-400 text-white font-semibold h-10 px-2 border rounded-md"
            >
              Search
            </button>
          </div>
          {isLoading ? (
            <div className=" h-[250px] w-full grid place-content-center">
              <Spin />
            </div>
          ) : (
            <>
              {srchUsers?.length !== 0 ? (
                <div className=" flex flex-col gap-2 h-[250px] mt-3 overflow-y-scroll">
                  {srchUsers?.map((u, i) => (
                    <Link
                      to={"/user/" + u?._id}
                      key={i}
                      className=" flex gap-2 px-2 items-center border w-full h-16 md:h-16 bg-slate-100 hover:bg-slate-200 cursor-pointer rounded-md"
                    >
                      <div className=" h-9 w-9 rounded-full object-contain overflow-hidden bg-white">
                        {u?.profile_img === "" ? (
                          <div className=" w-9 font-semibold text-[1rem] h-9 rounded-full bg-blue-200 grid place-content-center">
                            {u?.name.slice(0, 2)}
                          </div>
                        ) : (
                          <img
                            src={u.profile_img}
                            className=" h-full w-full"
                            alt=""
                          />
                        )}
                      </div>
                      <div className=" flex flex-col gap-0">
                        <p className="  m-0 text-sm">{u.name}</p>
                        <p className=" m-0 text-sm">{u.email}</p>
                      </div>
                    </Link>
                  ))}
                  {/* <div className=" border w-full h-8 md:h-10 bg-slate-200 rounded-md"></div>
              <div className=" border w-full h-8 md:h-10 bg-slate-200 rounded-md"></div>
              <div className=" border w-full h-8 md:h-10 bg-slate-200 rounded-md"></div>
              <div className=" border w-full h-8 md:h-10 bg-slate-200 rounded-md"></div> */}
                </div>
              ) : (
                <div className=" items-center justify-center flex flex-col gap-2 mt-3 h-[250px]">
                  <p className=" font-semibold text-xl text-gray-200">
                    No result Found
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UserSearch;
