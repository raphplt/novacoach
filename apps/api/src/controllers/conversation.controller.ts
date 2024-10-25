import { Request, Response } from "express";
import { ConversationService } from "../services/conversation.service";

export class ConversationController {
	private conversationService = new ConversationService();

	async createConversation(req: Request, res: Response): Promise<void> {
		try {
			const { participants } = req.body;
			const conversation =
				await this.conversationService.createConversation(participants);
			res.status(201).json(conversation);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getConversationById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const conversation =
				await this.conversationService.getConversationById(id);
			if (conversation) {
				res.status(200).json(conversation);
			} else {
				res.status(404).json({ message: "Conversation not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getAllConversations(req: Request, res: Response): Promise<void> {
		try {
			const conversations =
				await this.conversationService.getAllConversations();
			res.status(200).json(conversations);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getOrCreateConversation(req: Request, res: Response): Promise<void> {
		try {
			const { user1Id, user2Id } = req.body;
			const conversation =
				await this.conversationService.getOrCreateConversation(
					+user1Id,
					+user2Id,
				);
			res.status(200).json(conversation);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}