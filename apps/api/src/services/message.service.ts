import { AppDataSource } from "../../ormconfig";
import { Message } from "../entity/message";
import { Conversation } from "../entity/conversation";
import { User } from "../entity/user";

export class MessageService {
	private messageRepository = AppDataSource.getRepository(Message);
	private conversationRepository = AppDataSource.getRepository(Conversation);
	private userRepository = AppDataSource.getRepository(User);

	// Récupérer tous les messages
	async getAllMessages(): Promise<Message[]> {
		return this.messageRepository.find({
			relations: ["conversation", "sender"],
		});
	}

	// Récupérer un message par ID
	async getMessageById(id: string): Promise<Message | null> {
		const parsedId = parseInt(id, 10);
		return this.messageRepository.findOne({
			where: { idMessage: parsedId },
			relations: ["conversation", "sender"],
		});
	}

	// Créer un message
	async createMessage(
		conversationId: string,
		senderId: string,
		content: string,
		fileUrl?: string, 
	): Promise<Message> {
		const conversation = await this.conversationRepository.findOne({
			where: { id: parseInt(conversationId, 10) },
		});
	
		const sender = await this.userRepository.findOne({
			where: { id: parseInt(senderId, 10) },
		});
	
		if (!conversation) {
			throw new Error("Conversation not found");
		}
	
		if (!sender) {
			throw new Error("Sender not found");
		}
	

		const newMessage = this.messageRepository.create({
			content,
			conversation,
			sender,
			fileUrl, 
		});
	
		return this.messageRepository.save(newMessage);
	}
	

	// Mettre à jour un message
	async updateMessage(
		id: string,
		message: Partial<Message>,
	): Promise<Message | null> {
		const parsedId = parseInt(id, 10);
		const messageToUpdate = await this.messageRepository.findOneBy({
			idMessage: parsedId,
		});
		if (messageToUpdate) {
			Object.assign(messageToUpdate, message);
			return this.messageRepository.save(messageToUpdate);
		}
		return null;
	}

	// Supprimer un message
	async deleteMessage(id: string): Promise<boolean> {
		const parsedId = parseInt(id, 10);
		const messageToDelete = await this.messageRepository.findOneBy({
			idMessage: parsedId,
		});
		if (messageToDelete) {
			await this.messageRepository.remove(messageToDelete);
			return true;
		}
		return false;
	}

	// Récupérer les messages d'une conversation spécifique
	async getMessagesByConversation(
		conversationId: string,
	): Promise<Message[]> {
		return this.messageRepository.find({
			where: { conversation: { id: parseInt(conversationId, 10) } },
			relations: ["conversation", "sender"],
		});
	}
}
