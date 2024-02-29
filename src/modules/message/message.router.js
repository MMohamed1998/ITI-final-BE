import express from "express";
import { getMessages, sendMessage } from "./controller/message.js";
import auth from "../../middleware/auth.js";
import { endPoint } from "./message.endPoint.js";

const router = express.Router();

router.get("/:id", auth(endPoint.message), getMessages);
router.post("/send/:id", auth(endPoint.message), sendMessage);

export default router;
