import express from "express";
import http from "http";
import { Server } from "socket.io";
import getUserDetailsFromToken from "../helper/getUserDetailsFromToken.js";
import UserModel from "../model/UserModel.js";
// import { set } from "mongoose";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
//online user
const onlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("connect user", socket.id);

  const token = socket.handshake?.auth?.token;

  const user = await getUserDetailsFromToken(token);
  // console.log(user);
  socket.join(user?.id);
  onlineUser.add(user?.id?.toString());

  io.emit("onlineUser", Array.from(onlineUser));

  socket.on("messagePage", async (userId) => {
    console.log("userId", userId);
    const userDetails = await UserModel.findById(userId);
    console.log("userdetails", userDetails);
    const payload = {
      _id: userDetails._id,
      name: userDetails.name,
      profile_img: userDetails.profile_img,
      email: userDetails?.email,
      online: onlineUser.has(userId),
    };

    socket.emit("messageUser", payload);
  });
  socket.on("disconnect", () => {
    onlineUser.delete(user?.id);
    console.log("disconnect user", socket.id);
  });
});

export { app, server };
