import express from "express";
import http from "http";
import { Server } from "socket.io";
import getUserDetailsFromToken from "../helper/getUserDetailsFromToken.js";
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
  socket.join(user?.id);
  onlineUser.add(user?.id);
  console.log(onlineUser);
  console.log("token", token);
  io.emit("onlineUser", Array.from(onlineUser));
  socket.on("disconnect", () => {
    onlineUser.delete(user?.id);
    console.log("disconnect user", socket.id);
  });
});

export { app, server };
