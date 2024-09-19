import getUserDetailsFromToken from "../helper/getUserDetailsFromToken.js";
import UserModel from "../model/UserModel.js";

async function updateUserDetails(req, res) {
  try {
    console.log(req.cookies);
    const token = req.cookies.token || "";
    const user = await getUserDetailsFromToken(token);
    const { name, profile_img } = req.body;
    const updateUser = await UserModel.updateOne(
      { _id: user._id },
      {
        name,
        profile_img,
      }
    );

    const userInformation = await UserModel?.findById(user._id).select(
      "-password"
    );
    return res.status(200).json({
      message: "User update successfully",
      data: userInformation,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || error,
      error: true,
    });
  }
}
export default updateUserDetails;
