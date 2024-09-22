import React from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { HiOutlineUserAdd } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useSelector } from "react-redux";
const Slider = () => {
  const user = useSelector((state) => state.user);

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
          <div className=" cursor-pointer  transition-colors duration-200 w-10 h-10 rounded-md grid place-content-center">
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
          <div className=" cursor-pointer  transition-colors duration-200 hover:bg-white w-10 h-10 rounded-md grid place-content-center">
            <RiLogoutCircleLine size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
