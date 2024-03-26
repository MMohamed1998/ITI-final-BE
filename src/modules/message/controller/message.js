import Conversation from "../../../../DB/model/conversation.model.js";
import Message from "../../../../DB/model/message.model.js";
import { getReceiverSocketId, io } from "../../../../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    console.log(req.body)
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user;
    console.log(Message)
    console.log(receiverId)
    console.log(senderId)

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user;
console.log(senderId,userToChatId);
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages").populate("participants");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getUserConversation = async (req, res) => {
  console.log("first")
  try {
    const senderId = req.user;

    const conversations = await Conversation.find({
      participants: senderId,
    }).populate("messages");

    if (!conversations || conversations.length === 0) return res.status(200).json([]);

    

    res.status(200).json({message:"done",conversations});
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
