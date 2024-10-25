import { UserType } from "./user";

export type ConversationType = {
	id: number;
	createdAt: string;
	participants: UserType[];
	messages: MessageType[];
};

export type MessageType = {
	idMessage: number;
	content: string;
	sendDate: string;
	sender: User;
	conversation: Conversation;
};
