import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToMany,
	OneToMany,
	JoinTable,
} from "typeorm";
import { User } from "./user";
import { Message } from "./message";

@Entity()
export class Conversation {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	createdAt!: Date;

	@ManyToMany(() => User)
	@JoinTable()
	participants!: User[];

	@OneToMany(() => Message, (message) => message.conversation, {
		cascade: true,
	})
	messages!: Message[];
}
