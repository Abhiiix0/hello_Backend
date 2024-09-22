import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import uploadImg from "../cloudinary/uploadFile";
import toast from "react-hot-toast";
import axios from "axios";
import { setUser } from "../redux/userSlice";
const UserDetailsEdit = ({ data }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,

    profile_img: user?.profile_img, // Adding profilePic state
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const fileee = await uploadImg(file);
    // setimgName(fileee.display_name);
    // setPreview(fileee?.url); // Set image preview
    setFormData({ ...formData, profile_img: fileee?.url });
  };

  const userDetailsUpdate = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`;
      const res = await axios({
        method: "PUT",
        url: url,
        data: formData,
        withCredentials: true,
      });
      //   console.log(res);
      dispatch(setUser(res?.data?.data));
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const [imgChng, setimgChng] = useState(false);
  //   useEffect(() => {
  //     console.log("user from edit", user);
  //     setFormData({
  //       name: user?.name,
  //       email: user?.email,
  //       profile_img: user?.profile_img,
  //     });
  //   }, []);

  return (
    <div>
      <Modal
        closeIcon={false}
        open={data?.opneEditModal}
        footer={false}
        onCancel={() => data?.setopneEditModal(false)}
      >
        <div>
          <h1 className=" font-bold text-xl uppercase">Profile Details</h1>
          <div className=" my-3 flex flex-col w-full gap-2">
            <div className="  grid place-content-center">
              <div
                onMouseEnter={() => setimgChng(true)}
                onMouseLeave={() => setimgChng(false)}
                className=" border relative gird place-content-center object-contain bg-slate-200 w-32 overflow-hidden h-32 rounded-full"
              >
                {formData?.profile_img === "" ? (
                  <div className=" w-32 bg-slate-200 text-4xl font-bold grid place-content-center uppercase h-full">
                    {user?.name.slice(0, 2)}
                  </div>
                ) : (
                  <img src={formData?.profile_img} alt="" />
                )}
                {imgChng && (
                  <label
                    htmlFor="profilePic"
                    className=" cursor-pointer grid place-content-center font-medium bg-slate-100 w-full h-10 opacity-[0.5] absolute bottom-0 left-0"
                  >
                    Change
                  </label>
                )}
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 transition-opacity duration-300 bg-gray-200 hidden border h-12  place-content-center rounded-lg focus:outline-none focus:border-[#46CDCF]"
                />
              </div>
            </div>
            <div>
              <p>Name</p>
              <input
                type="text"
                required
                value={formData?.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className=" px-2 outline-[#2B8A8D] h-8 w-full border rounded-md"
              />
            </div>
          </div>
          <div className="  w-full justify-end  flex gap-2">
            <button
              onClick={() => data?.setopneEditModal(false)}
              className=" border h-8 rounded-md border-[#2B8A8D] text-[#2B8A8D] hover:text-white hover:bg-[#2B8A8D] w-20 grid place-content-center "
            >
              Cancel
            </button>
            <button
              onClick={() => userDetailsUpdate()}
              className=" border h-8 rounded-md text-white  border-[#2B8A8D] bg-[#2B8A8D] hover:bg-[#24797b] w-20 grid place-content-center "
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserDetailsEdit;
