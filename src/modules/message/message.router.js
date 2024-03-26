import express from "express";
import { getMessages, getUserConversation, sendMessage } from "./controller/message.js";
import auth from "../../middleware/auth.js";
import { endPoint } from "./message.endPoint.js";

const router = express.Router();
router.get("/conversations", auth(endPoint.message), getUserConversation);

router.get("/:id", auth(endPoint.message), getMessages);
router.post("/sendMessage/:id", auth(endPoint.message), sendMessage);

export default router;
