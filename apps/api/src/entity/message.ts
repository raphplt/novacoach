import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Conversation } from "./conversation";
import { User } from "./user";

@Entity()
export class Message {
	@PrimaryGeneratedColumn()
	idMessage!: number;

	@Column()
	content!: string;

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	sendDate!: Date;

	@Column({ nullable: true })
	fileUrl?: string;

	@ManyToOne(() => User, (user) => user.messages)
	sender!: User;

	@ManyToOne(() => Conversation, (conversation) => conversation.messages, {
		onDelete: "CASCADE",
	})
	conversation!: Conversation;
}
