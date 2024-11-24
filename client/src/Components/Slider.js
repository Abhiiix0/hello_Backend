import React, { useEffect, useMemo, useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { HiOutlineUserAdd } from "react-icons/hi";
import hellowd from "../assets/Hello.png";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import UserDetailsEdit from "./UserDetailsEdit";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import UserSearch from "./UserSearch";
import { FaRegImage } from "react-icons/fa6";
import decryptMessage from "../encryptionMthods/decryptiMessage";
import { BsThreeDotsVertical } from "react-icons/bs";
const Slider = () => {
  const socketConnection = useSelector((state) => state.user.socketConnection);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [opneEditModal, setopneEditModal] = useState(false);
  const memoizedValue = useMemo(
    () => ({ opneEditModal, setopneEditModal }),
    [opneEditModal]
  );

  const userLogout = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/logout`;
    try {
      const res = await axios({
        method: "get",
        url,
        withCredentials: true,
      });
      if (res?.data?.sucess) {
        toast.success("Logged out successfully");
        localStorage.removeItem("token");
        navigate("/login");
      }
      //   console.log(res);
    } catch (error) {
      //   console.log(error);
      toast.error("Faild to logout");
    }
  };
  const [allUser, setallUser] = useState([]);
  const [srchUserModal, setsrchUserModal] = useState(false);
  useEffect(() => {
    if (socketConnection) {
      // console.log("sidebar", user?._id);
      socketConnection.emit("sidebar", user._id);
      socketConnection.on("alluserChat", (data) => {
        // console.log("alluserChat", data);

        const conversationuserData = data?.map((convoUser) => {
          if (convoUser?.sender?._id === convoUser?.receiver?._id) {
            return {
              ...convoUser,
              userDetails: convoUser?.sender,
            };
          } else if (convoUser?.sender?._id === user?._id) {
            return {
              ...convoUser,
              userDetails: convoUser?.receiver,
            };
          } else {
            return {
              ...convoUser,
              userDetails: convoUser?.sender,
            };
          }
        });
        // console.log("conversationuserData", conversationuserData);
        setallUser(conversationuserData);
      });
    }
  }, [socketConnection, user]);

  const [optionBtn, setoptionBtn] = useState(false);

  return (
    <div className=" w-full h-full grid grid-cols-1 lg:grid-cols-[62px,1fr]">
      <div className=" w-[62px] h-full bg-[#c4efef] flex-col items-center hidden lg:flex  justify-between py-3  gap-2">
        <div className=" flex flex-col gap-3">
          <div className=" cursor-pointer  transition-colors duration-200 bg-white w-10 h-10 rounded-md grid place-content-center">
            <IoChatbubbleEllipsesOutline size={25} />
          </div>
          <div
            onClick={() => setsrchUserModal(true)}
            className=" cursor-pointer  transition-colors duration-200 hover:bg-white w-10 h-10 rounded-md grid place-content-center"
          >
            <HiOutlineUserAdd size={25} />
          </div>
        </div>

        <div className=" flex flex-col gap-3">
          <div
            onClick={() => setopneEditModal(true)}
            className=" cursor-pointer  transition-colors duration-200 w-10 h-10 rounded-md grid place-content-center"
          >
            {user?.profile_img === "" ? (
              // <CgProfile name="User Name" glyphName={"ab"} size={25} />
              <p className=" bg-yellow-100  border-black border-[2px] w-8 grid place-content-center capitalize h-8 rounded-full">
                {" "}
                {user?.name.slice(0, 2)}
              </p>
            ) : (
              <img
                src={user?.profile_img}
                className="w-8 grid place-content-center capitalize h-8 rounded-full "
                alt=""
              />
            )}
          </div>
          <div
            onClick={() => userLogout()}
            className=" cursor-pointer  transition-colors duration-200 hover:bg-white w-10 h-10 rounded-md grid place-content-center"
          >
            <RiLogoutCircleLine size={25} />
          </div>
        </div>
      </div>
      <div className=" w-full h-[100vh] bg-white border  rounded-md overflow-hidden">
        <div
          className={` bg-white w-[200px] h-fit  overflow-hidden rounded-md lg:hidden absolute right-4 border-[#c4efef] shadow-md top-16 transition ${
            !optionBtn ? " scale-0" : " scale-100"
          }`}
        >
          <p
            onClick={() => {
              setoptionBtn(false);
              setopneEditModal(true);
            }}
            className="cursor-pointer m-0 p-2 flex justify-start gap-2 items-center hover:bg-[#e1f8f8] border-b"
          >
            {user?.profile_img === "" ? (
              <p className=" bg-yellow-100 text-[10px]  border-black border-[2px] w-6 grid place-content-center capitalize h-6 rounded-full">
                {" "}
                {user?.name.slice(0, 2)}
              </p>
            ) : (
              <img
                src={user?.profile_img}
                className="w-6 grid place-content-center capitalize h-6 rounded-full "
                alt=""
              />
            )}{" "}
            Profile
          </p>
          <p
            onClick={() => {
              setoptionBtn(false);
              setsrchUserModal(true);
            }}
            className="cursor-pointer m-0 p-2 flex justify-start gap-2 items-center hover:bg-[#e1f8f8] border-b"
          >
            <HiOutlineUserAdd size={19} /> Search user
          </p>
          <p
            onClick={() => userLogout()}
            className="cursor-pointer m-0 p-2 flex justify-start gap-2 items-center hover:bg-[#e1f8f8] border-b"
          >
            <RiLogoutCircleLine size={19} /> Logout
          </p>
        </div>
        <div className=" border-b px-2  border-[#c4efef] h-[60px] flex items-center justify-between ">
          <p className=" font-semibold text-xl hidden lg:block">Message</p>
          <img
            src={hellowd}
            alt="Messaging Illustration"
            className="w-28  fill-transparent lg:hidden"
          />
          <div
            onClick={() => setoptionBtn(!optionBtn)}
            className=" rounded-full lg:hidden cursor-pointer p-1"
          >
            <BsThreeDotsVertical size={22} />
          </div>
        </div>
        <div className="  h-[calc(100vh-60px)] p-1 bg-[#c4efef] lg:bg-white w-full">
          {allUser?.length !== 0 ? (
            <div className="  w-full h-full flex flex-col gap-1">
              {allUser?.map((usr, i) => (
                <NavLink
                  // key={i}
                  to={`/user/` + usr?.userDetails?._id}
                  key={usr?.userDetails?._id || i}
                  className=" border-b-[1px] hover:border overflow-hidden transition-colors duration-300 transition-all bg-white rounded-md hover:border-[#c4efef] lg:hover:bg-[#e6f7f7] hover:rounded-md h-14 items-center px-2 flex w-full"
                >
                  <div className=" flex gap-2 w-full items-center ">
                    <div className=" w-10   h-10">
                      {usr?.userDetails?.profile_img === "" ? (
                        // <CgProfile name="User Name" glyphName={"ab"} size={25} />
                        <p className=" bg-yellow-100  border-black  grid place-content-center capitalize h-10 w-10 rounded-full">
                          {" "}
                          {usr.userDetails.name.slice(0, 2)}
                        </p>
                      ) : (
                        <div className=" w-10 h-10  rounded-full ">
                          <img
                            src={usr?.userDetails?.profile_img}
                            className=" w-10 h-10 rounded-full "
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                    <div className=" flex w-full justify-between items-start gap-2">
                      <div className=" flex flex-col  w-full">
                        <p className=" m-0 text-ellipsis overflow-hidden line-clamp-1 font-normal ">
                          {usr?.userDetails?.name}
                        </p>
                        <p className=" mt-[-2px] overflow-hidden m-0 text-ellipsis text-gray-400  line-clamp-1 text-[12px] ">
                          {usr?.lastMsg?.text === ""
                            ? usr?.lastMsg?.text
                            : decryptMessage(usr?.lastMsg?.text)}
                        </p>
                        {usr?.lastMsg?.imageUrl && (
                          <p className=" flex gap-1 items-center m-0 text-ellipsis text-gray-400  line-clamp-1 text-[12px]">
                            {" "}
                            <FaRegImage size={15} /> Image
                          </p>
                        )}
                      </div>
                      {usr?.unmessages !== 0 && (
                        <div className="m-0 mt-[2px] h-5 w-6 rounded-full line-clamp-1 bg-blue-300 text-[10px] grid place-content-center text-white ">
                          {usr?.unmessages}
                        </div>
                      )}
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          ) : (
            <div className=" h-full grid place-content-center w-full">
              <p className=" text-center max-w-[320px] lg:w-full text-white text-3xl lg:text-gray-200 font-semibold lg:text-xl">
                Explore users to start a conversation with.
              </p>
            </div>
          )}
        </div>
      </div>
      {opneEditModal && (
        <UserDetailsEdit
          data={memoizedValue}
          // open={opneEditModal}
          // setopneEditModal={setopneEditModal}
        />
      )}
      <UserSearch open={srchUserModal} close={setsrchUserModal}></UserSearch>
    </div>
  );
};

export default Slider;
