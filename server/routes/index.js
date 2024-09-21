import express from "express";
import registerUser from "../controller/registerUser.js";
import checkEmail from "../controller/checkEmail.js";
import checkPassword from "../controller/checkPassword.js";
import userDetails from "../controller/userDetails.js";
import logout from "../controller/logout.js";
import updateUserDetails from "../controller/updateUserDetails.js";
import login from "../controller/login.js";

// to create routes
const router = express.Router();

router.post("/register", registerUser);
router.post("/email", checkEmail);
router.post("/password", checkPassword);
router.post("/login", login);

router.get("/user-details", userDetails);
router.get("/logout", logout);
router.post("/update-user", updateUserDetails);
//we will exports all the routes
export default router;
