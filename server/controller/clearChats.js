import ConversationModel from "../model/ConversationModel.js";
import UserModel from "../model/UserModel.js";

const clearChats = async (req, res) => {
  try {
    console.log(req.body);
    const { sender, receiver } = req.body;
    const getConversationmsg = await ConversationModel.findOneAndDelete({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],
    })
      .populate("messages")
      .sort({ updatedAt: -1 });
    console.log(getConversationmsg);
    return res.status(200).json({
      status: true,
      message: "Conversation deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || error,
      error: true,
    });
  }
};

export default clearChats;
