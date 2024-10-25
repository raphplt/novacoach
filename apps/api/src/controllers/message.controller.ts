import { FileUploadService } from "../services/fileUpload.service";
import { MessageService } from "../services/message.service";
import { Request, Response } from "express";

export class MessageController {
	private messageService = new MessageService();
	private fileUploadService = new FileUploadService();

	// Récupérer tous les messages
	async getAllMessages(req: Request, res: Response): Promise<void> {
		try {
			const messages = await this.messageService.getAllMessages();
			res.status(200).json(messages);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	// Récupérer un message par ID
	async getMessageById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const message = await this.messageService.getMessageById(id);
			if (message) {
				res.status(200).json(message);
			} else {
				res.status(404).json({ message: "Message not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	// Créer un message
	async createMessage(req: Request, res: Response): Promise<void> {
		try {
			const { room, senderId, content } = req.body;
			console.log(room, senderId, content);

			let newMessage;
			if (req.file) {
				const fileUrl = await this.fileUploadService.uploadFile(
					req.file.path,
				);
				newMessage = await this.fileUploadService.saveMessageWithFile(
					room,
					senderId,
					content,
					fileUrl,
				);
			} else {
				newMessage = await this.messageService.createMessage(
					room,
					senderId,
					content,
				);
			}

			res.status(201).json(newMessage);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	// Mettre à jour un message
	async updateMessage(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const { content } = req.body;
			const message = await this.messageService.updateMessage(id, {
				content,
			});
			if (message) {
				res.status(200).json(message);
			} else {
				res.status(404).json({ message: "Message not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	// Supprimer un message
	async deleteMessage(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const isDeleted = await this.messageService.deleteMessage(id);
			if (isDeleted) {
				res.status(204).end();
			} else {
				res.status(404).json({ message: "Message not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	// Récupérer tous les messages d'une conversation spécifique
	async getMessagesByConversation(
		req: Request,
		res: Response,
	): Promise<void> {
		try {
			const { conversationId } = req.params;
			const messages =
				await this.messageService.getMessagesByConversation(
					conversationId,
				);
			res.status(200).json(messages);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}
