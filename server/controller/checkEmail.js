import UserModel from "../model/UserModel.js";

async function checkEmail(req, res) {
  try {
    const { email } = req.body;
    const checkEmail = await UserModel.findOne({ email }).select("-password");
    if (!checkEmail) {
      return res.status(400).json({ message: "User not exists", error: true });
    }

    return res.status(200).json({
      message: "Email verify",
      success: true,
      data: checkEmail,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "something went wrong",
      error: true,
    });
  }
}
export default checkEmail;
