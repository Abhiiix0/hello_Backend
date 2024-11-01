import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      default: "",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    msgBySender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    msgByReceiver: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Messagemodel = mongoose.model("Message", MessageSchema);
export default Messagemodel;
