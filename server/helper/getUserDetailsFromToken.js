import jwt from "jsonwebtoken";
import UserModel from "../model/UserModel.js";

const getUserDetailsFromToken = async (token) => {
  if (!token) {
    return {
      message: "session out",
      logout: true,
    };
  }

  try {
    const decode = await jwt.verify(token, process.env.JWT_SECRETKEY);
    const user = await UserModel.findById(decode.id).select("-password");
    return user;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Handle expired token case
      return {
        message: "Token has expired, please log in again.",
        logout: true,
      };
    } else {
      // Handle other token verification errors
      return {
        message: "Token is invalid.",
        logout: true,
      };
    }
  }
};

export default getUserDetailsFromToken;
