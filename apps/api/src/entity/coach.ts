import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToOne,
	JoinColumn,
	OneToMany,
} from "typeorm";
import { Structure } from "./structure";
import { User } from "./user";
import { SessionBooking } from "./sessionBooking";
import { UserTrackProgram } from "./userTrackProgram";

@Entity()
export class Coach {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: true })
	description?: string;

	@ManyToOne(() => Structure, (structure) => structure.coaches, {
		nullable: true,
		onDelete: "CASCADE",
	})
	structure?: Structure;

	@OneToMany(
		() => UserTrackProgram,
		(userTrackProgram) => userTrackProgram.coach,
		{ nullable: true, onDelete: "CASCADE" },
	)
	userTrackPrograms?: UserTrackProgram[];

	@OneToOne(() => User, { onDelete: "CASCADE" })
	@JoinColumn()
	user!: User;

	@OneToMany(() => User, (user) => user.coach)
	students?: User[];

	@OneToMany(() => SessionBooking, (sessionBooking) => sessionBooking.coach)
	sessionBooking?: SessionBooking[];
}