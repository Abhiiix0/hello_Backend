import express from "express";
import http from "http";
import { Server } from "socket.io";
import getUserDetailsFromToken from "../helper/getUserDetailsFromToken.js";
import UserModel from "../model/UserModel.js";
import ConversationModel from "../model/ConversationModel.js";
import Messagemodel from "../model/MessageModel.js";
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
  socket.join(user?.id?.toString());
  onlineUser.add(user?.id?.toString());

  io.emit("onlineUser", Array.from(onlineUser));

  socket.on("messagePage", async (userId) => {
    // console.log("userId", userId);
    const userDetails = await UserModel.findById(userId);
    // console.log("userdetails", userDetails);
    const payload = {
      _id: userDetails._id,
      name: userDetails.name,
      profile_img: userDetails.profile_img,
      email: userDetails?.email,
      online: onlineUser.has(userId),
    };

    socket.emit("messageUser", payload);

    //
    const getConversationmsg = await ConversationModel.findOne({
      $or: [
        { sender: user?.id, receiver: userId },
        { sender: userId, receiver: user?.id },
      ],
    })
      .populate("messages")
      .sort({ updatedAt: -1 });
    // console.log(object)
    const datamsgss =
      getConversationmsg?.messages?.length === 0
        ? []
        : getConversationmsg?.messages;
    io.to(user?.id).emit("prvMsg", datamsgss);
  });

  socket.on("NewMessage", async (data) => {
    console.log("userSendData", data);
    // search if conversation is available or not
    const coversation = await ConversationModel.findOne({
      $or: [
        { sender: data.sender, receiver: data.receiver },
        { sender: data.receiver, receiver: data.sender },
      ],
    });

    //create a convo
    if (!coversation) {
      const createConversation = await ConversationModel({
        sender: data.sender,
        receiver: data.receiver,
      });
      const conversation = await createConversation.save();
    }

    //message
    const message = new Messagemodel({
      text: data.text,
      imageUrl: "",
      videoUrl: "",
      msgBySender: data.sender,
    });
    const saveMessage = await message.save();

    // update conversation
    const updateConversation = await ConversationModel.updateOne(
      {
        _id: coversation?._id,
      },
      { $push: { messages: saveMessage?._id } }
    );

    const getConversationmsg = await ConversationModel.findOne({
      $or: [
        { sender: data.sender, receiver: data.receiver },
        { sender: data.receiver, receiver: data.sender },
      ],
    })
      .populate("messages")
      .sort({ updatedAt: -1 });

    console.log("sender", data.sender);
    console.log("receiver", data.receiver);

    io.to(data.receiver).emit("message", getConversationmsg.messages || []);
    io.to(data.sender).emit("message", getConversationmsg.messages || []);
    console.log("userSend Msg", data);
    // console.log("coversation", getConversationmsg);
  });

  socket.on("sidebar", async (data) => {
    console.log("sidebar", data);
    if (data) {
      const getChatConversationmsg = await ConversationModel.find({
        $or: [{ sender: data }, { receiver: data }],
      })
        .sort({ updatedAt: -1 })
        .populate("messages")
        .populate("sender")
        .populate("receiver")
        .select("-password");
      console.log("hi", getChatConversationmsg);
      const conversations = getChatConversationmsg?.map((conv) => {
        const CountUnseenMsg = conv?.messages.reduce(
          (prv, cur) => prv + (cur?.seen ? 0 : 1),
          0
        );
        return {
          _id: conv?._id,
          sender: conv?.sender,
          receiver: conv?.receiver,
          unmessages: CountUnseenMsg,
          lastMsg: conv.messages[conv?.messages?.length - 1],
        };
      });
      socket.emit("alluserChat", conversations);
    }
  });
  socket.on("disconnect", () => {
    onlineUser.delete(user?.id);
    console.log("disconnect user", socket.id);
  });
});

export { app, server };
