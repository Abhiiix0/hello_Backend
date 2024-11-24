import express from "express";
import registerUser from "../controller/registerUser.js";
import checkEmail from "../controller/checkEmail.js";
import checkPassword from "../controller/checkPassword.js";
import userDetails from "../controller/userDetails.js";
import logout from "../controller/logout.js";
import updateUserDetails from "../controller/updateUserDetails.js";
import login from "../controller/login.js";
import searchUser from "../controller/searchUser.js";
import clearChats from "../controller/clearChats.js";
import { forgetPassOtpSend } from "../controller/forgetPassOtpSend.js";
import { OtpConfirm } from "../controller/OtpConfirm.js";
import { ResetPassword } from "../controller/ResetPassword.js";

// to create routes
const router = express.Router();

router.post("/register", registerUser);
router.post("/email", checkEmail);
router.post("/password", checkPassword);
router.post("/login", login);

router.get("/user-details", userDetails);
router.get("/logout", logout);
router.put("/update-user", updateUserDetails);
router.post("/search-user", searchUser);
router.post("/clear-chats", clearChats);
router.post("/getotp", forgetPassOtpSend);
router.post("/verify-otp", OtpConfirm);
router.post("/reset-password", ResetPassword);
//we will exports all the routes
export default router;
