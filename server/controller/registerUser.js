import UserModel from "../model/UserModel.js";
import bycrypt from "bcryptjs";
async function registerUser(req, res) {
  try {
    //destructure the req.body so will get all the data sent by user
    const { name, email, password, profile_img } = req.body;

    //Check if this email already register or not
    const CheckEmail = await UserModel.findOne({ email });
    if (CheckEmail) {
      return res.status(409).json({
        message: "Already user exits",
        error: true,
      });
    }

    // encrypt the password for security
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);
    const payload = {
      name,
      email,
      profile_img,
      password: hashedPassword,
    };

    //create a new user
    const user = await UserModel.create(payload);
    const userSave = await user.save();

    return res.status(201).json({
      message: "User created successfully",
      data: userSave,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || error,
      error: error,
    });
  }
}

export default registerUser;
