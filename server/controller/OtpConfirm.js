import UserModel from "../model/UserModel.js";

export const OtpConfirm = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(email, otp);
    if (!otp) {
      return res.status(400).json({ message: "Please enter OTP", error: true });
    }
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Email not found", error: true });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP", error: true });
    }
    if (user.otp === otp) {
      const userUpdate = await UserModel.updateOne({ email }, { otp: "" });
      return res.status(200).json({
        message: "OTP verified successfully",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error?.message || error,
      error: true,
    });
  }
};
