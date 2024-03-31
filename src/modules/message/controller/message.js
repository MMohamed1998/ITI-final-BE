import userModel from "../../../../DB/model/User.model.js";
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
    console.log("hello")
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


export const sendNotification = async (req, res) => {
  try {
    // Validation
    const senderId = req.user;
    if (!senderId) {
      return res.status(400).json({ error: "Sender ID is missing" });
    }

    const { receiverId, notification } = req.body; 
    if (!receiverId || !notification) {
      return res.status(400).json({ error: "Receiver ID or notification content is missing" });
    }

    // Fetch sender
    const sender = await userModel.findById(senderId);
    if (!sender) {
      return res.status(404).json({ error: "Sender not found" });
    }

    // Logic to send notification to the user with receiverId
    // You can use any notification service or method here, such as sending an email, push notification, or socket.io

    // Example: Send a socket.io notification
    const receiverSocketId = getReceiverSocketId(receiverId); // Assuming you have this function
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("notification", { receiverId,  notification: {
        userId: sender._id,
        name: sender.userName,
        content: notification 
      }  });
    }

    // Save the notification in the user's document
    await userModel.findByIdAndUpdate(receiverId, { 
      $push: { 
        notification: {
          userId: sender._id,
          name: sender.userName,
          content: notification 
        } 
      } 
    });

    res.status(200).json({ success: true, message: "Notification sent successfully" });
  } catch (error) {
    console.log("Error in sendNotification controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getNotifications = async (req, res) => {
  try {
    // Extract the user ID from the request
    const userId=req.user
    // Find the user by ID and retrieve their notifications
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user's notifications
    res.status(200).json({userId:user._id,userName:user.userName, notifications: user.notification });
  } catch (error) {
    console.log("Error in getUserNotifications controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};