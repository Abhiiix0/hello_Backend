import UserModel from "../model/UserModel.js";
import bycrypt from "bcryptjs";
export const ResetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!password) {
      return res
        .status(400)
        .json({ message: "Please enter Password", error: true });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found", error: true });
    }
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);
    const userUpdate = await UserModel.updateOne(
      { email },
      { password: hashedPassword }
    );
    return res.status(200).json({
      message: "Password Reset Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error?.message || error,
      error: true,
    });
  }
};
