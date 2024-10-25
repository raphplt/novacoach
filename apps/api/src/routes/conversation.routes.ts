import { Router } from "express";
import { ConversationController } from "../controllers/conversation.controller";

const router = Router();
const conversationController = new ConversationController();

router.post("/conversations", (req, res) =>
	conversationController.createConversation(req, res),
);

router.get("/conversations", (req, res) =>
	conversationController.getAllConversations(req, res),
);

router.get("/conversations/:id", (req, res) =>
	conversationController.getConversationById(req, res),
);

router.post("/conversations/getOrCreate", (req, res) =>
	conversationController.getOrCreateConversation(req, res),
);

export default router;