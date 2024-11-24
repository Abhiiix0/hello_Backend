import UserModel from "../model/UserModel.js";
import nodemailer from "nodemailer";
export const forgetPassOtpSend = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Email not found", error: true });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const userUpdate = await UserModel.updateOne({ email }, { otp });
    const createTransport = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      service: "Gmail",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: "goodtimes4info@gmail.com",
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: "goodtimes4info@gmail.com",
      to: email,
      subject: "Your OTP for Reset Password",
      text: `Hello,
      Your One-Time Password (OTP) for  Reset Password is: ${otp}`,
    };

    createTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: "Failed to send OTP", error: true });
      }
      res
        .status(201)
        .json({ message: "OTP has been sent to your email", success: true });
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || error,
      error: true,
    });
  }
};
