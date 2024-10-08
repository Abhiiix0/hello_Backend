import express from "express";
import cors from "cors";
import dotnet from "dotenv";
import connectDB from "./config/connectDB.js";
import router from "../client/src/routes/index.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/index.js";
dotnet.config();
// const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({
    message: "Server is running on port " + PORT,
  });
});

// api endpoint
app.use("/api", router);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
