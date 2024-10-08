import UserModel from "../model/UserModel.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exists",
        error: true,
      });
    }
    const decryptPassword = await bycrypt.compare(password, user?.password);

    if (!decryptPassword) {
      return res.status(400).json({
        message: "Please check email & password",
        error: true,
      });
    }

    const tokenData = {
      id: user?._id,
      email: user?.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRETKEY, {
      expiresIn: "7d",
    });

    const cookieOption = {
      http: true,
      secure: true,
      sameSite: "None",
      // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
    };
    return res.cookie("token", token, cookieOption).status(200).json({
      message: "Login successfully",
      token: token,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || error,
      error: true,
    });
  }
}
export default login;
