import ConversationModel from "../model/ConversationModel.js";

const getConversations = async (data) => {
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
      const CountUnseenMsg = conv?.messages.reduce((prv, cur) => {
        const msgByUserId = cur?.msgBySender.toString();
        //data is current user Id
        if (msgByUserId !== data) {
          return prv + (cur?.seen ? 0 : 1);
        } else {
          return prv;
        }
      }, 0);
      return {
        _id: conv?._id,
        sender: conv?.sender,
        receiver: conv?.receiver,
        unmessages: CountUnseenMsg,
        lastMsg: conv.messages[conv?.messages?.length - 1],
      };
    });
    return conversations;
    // socket.emit("alluserChat", conversations);
  } else {
    return [];
  }
};
export default getConversations;
