import { AppDataSource } from "../../ormconfig";
import { Conversation } from "../entity/conversation";
import { User } from "../entity/user";

export class ConversationService {
	private conversationRepository = AppDataSource.getRepository(Conversation);
	private userRepository = AppDataSource.getRepository(User);

	async createConversation(participants: User[]): Promise<Conversation> {
		const newConversation = this.conversationRepository.create({
			participants,
		});
		return this.conversationRepository.save(newConversation);
	}

	async getConversationById(id: string): Promise<Conversation | null> {
		return this.conversationRepository.findOne({
			where: { id: parseInt(id, 10) },
			relations: ["messages", "messages.sender", "participants"],
		});
	}

	async getAllConversations(): Promise<Conversation[]> {
		return this.conversationRepository.find({
			relations: ["messages", "messages.sender", "participants"],
		});
	}

	async getOrCreateConversation(
		user1Id: number,
		user2Id: number,
	): Promise<Conversation> {
		const conversations = await this.conversationRepository.find({
			relations: ["participants", "messages", "messages.sender"],
			where: [
				{ participants: { id: user1Id } },
				{ participants: { id: user2Id } },
			],
		});
		const conversation = conversations.find(
			(conversation) =>
				conversation.participants.some(
					(participant) => participant.id === user1Id,
				) &&
				conversation.participants.some(
					(participant) => participant.id === user2Id,
				),
		);
		if (conversation) {
			return conversation;
		}
		const user1 = await this.userRepository.findOneBy({ id: user1Id });
		const user2 = await this.userRepository.findOneBy({ id: user2Id });
		if (!user1 || !user2) {
			throw new Error("One or both users not found");
		}
		return this.createConversation([user1, user2]);
	}

	// Nouvelle méthode pour obtenir la conversation par les IDs des participants
	async getConversationByParticipants(
		user1Id: number,
		user2Id: number,
	): Promise<Conversation | null> {
		const conversations = await this.conversationRepository.find({
			relations: ["participants"],
			where: [
				{ participants: { id: user1Id } },
				{ participants: { id: user2Id } },
			],
		});
		return (
			conversations.find(
				(conversation) =>
					conversation.participants.some(
						(participant) => participant.id === user1Id,
					) &&
					conversation.participants.some(
						(participant) => participant.id === user2Id,
					),
			) || null
		);
	}
}