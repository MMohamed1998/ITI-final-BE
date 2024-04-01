import express from "express";
import { getMessages, getUserConversation, getNotifications, sendMessage, sendNotification } from "./controller/message.js";
import auth from "../../middleware/auth.js";
import { endPoint } from "./message.endPoint.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";

const router = express.Router();
router.get("/conversations", auth(endPoint.message), getUserConversation);

router.get("/:id", auth(endPoint.message), getMessages);
router.post("/sendMessage/:id", auth(endPoint.message), sendMessage);
router.post("/send/notification", auth(endPoint.message), sendNotification );
router.get("/show/notification", auth(endPoint.message), getNotifications );

export default router;
