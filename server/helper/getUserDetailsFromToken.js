import jwt from "jsonwebtoken";
import UserModel from "../model/UserModel.js";
const getUserDetailsFromToken = async (token) => {
  if (!token) {
    return {
      message: "session out",
      logout: true,
    };
  }
  const decode = await jwt.verify(token, process.env.JWT_SECRETKEY);
  const user = await UserModel.findById(decode.id);
  return user;
};
export default getUserDetailsFromToken;
