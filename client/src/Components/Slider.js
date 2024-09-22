import React, { useMemo, useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { HiOutlineUserAdd } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import UserDetailsEdit from "./UserDetailsEdit";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Slider = () => {
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

  return (
    <div className=" w-full h-full">
      <div className=" w-[62px] h-full bg-[#c4efef] flex flex-col items-center  justify-between py-3  gap-2">
        <div className=" flex flex-col gap-3">
          <div className=" cursor-pointer  transition-colors duration-200 bg-white w-10 h-10 rounded-md grid place-content-center">
            <IoChatbubbleEllipsesOutline size={25} />
          </div>
          <div className=" cursor-pointer  transition-colors duration-200 hover:bg-white w-10 h-10 rounded-md grid place-content-center">
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
                src="https://res.cloudinary.com/dldypjtlj/image/upload/v1726925402/hrgqaeek4h0ilmb7srvn.png"
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
      {opneEditModal && (
        <UserDetailsEdit
          data={memoizedValue}
          // open={opneEditModal}
          // setopneEditModal={setopneEditModal}
        />
      )}
    </div>
  );
};

export default Slider;
