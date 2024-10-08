import React, { useEffect, useMemo, useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { HiOutlineUserAdd } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import UserDetailsEdit from "./UserDetailsEdit";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import UserSearch from "./UserSearch";
import { FaRegImage } from "react-icons/fa6";
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
        console.log("alluserChat", data);

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
        console.log("conversationuserData", conversationuserData);
        setallUser(conversationuserData);
      });
    }
  }, [socketConnection, user]);

  return (
    <div className=" w-full h-full grid grid-cols-[62px,1fr]">
      <div className=" w-[62px] h-full bg-[#c4efef] flex flex-col items-center  justify-between py-3  gap-2">
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
      <div className=" w-full h-full bg-white rounded-md overflow-hidden">
        <div className=" border-b px-2  border-[#c4efef] h-[60px] flex items-center justify-start ">
          <p className=" font-semibold text-xl">Message</p>
        </div>
        <div className="  h-[calc(100vh-60px)] p-1 w-full">
          {allUser?.length !== 0 ? (
            <div className="  w-full h-full flex flex-col gap-1">
              {allUser?.map((usr) => (
                <NavLink
                  to={`/user/` + usr?.userDetails?._id}
                  key={usr?.userDetails?._id}
                  className=" border-b-[1px] hover:border transition-colors duration-300 transition-all hover:border-[#c4efef] hover:bg-[#e6f7f7] hover:rounded-md h-14 items-center px-2 flex w-full"
                >
                  <div className=" flex gap-2 w-full items-center ">
                    <div className=" w-10   h-10">
                      {usr?.userDetails?.profile_img === "" ? (
                        // <CgProfile name="User Name" glyphName={"ab"} size={25} />
                        <p className=" bg-yellow-100  border-black  grid place-content-center capitalize h-10 w-10 rounded-full">
                          {" "}
                          {usr.receiver.name.slice(0, 2)}
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
                        <p className=" m-0 text-ellipsis line-clamp-1 font-normal ">
                          {usr?.userDetails?.name}
                        </p>
                        <p className=" mt-[-2px] m-0 text-ellipsis text-gray-400  line-clamp-1 text-[12px] ">
                          {usr?.lastMsg?.text}
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
              <p className=" text-center w-full text-gray-200 font-semibold text-xl">
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
