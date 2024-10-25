import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	OneToMany,
	ManyToOne,
} from "typeorm";
import { Coach } from "./coach";
import { UserSportProgram } from "./userSportProgram";
import { SessionBooking } from "./sessionBooking";
import { Role } from "./role";
import { UserDetails } from "./userDetails";
import { Structure } from "./structure";
import { Message } from "./message";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	firstName!: string;

	@Column()
	lastName!: string;

	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Column({ nullable: true })
	address?: string;

	@Column({ nullable: true })
	phone?: string;

	@CreateDateColumn({ type: "timestamp" })
	createDate!: Date;

	@UpdateDateColumn({ type: "timestamp" })
	updateDate!: Date;

	// Relations

	@ManyToOne(() => Role, (role) => role.users)
	role!: Role;

	@ManyToOne(() => Structure, (structure) => structure.users)
	structure?: Structure;

	// Représente le coach de l'user
	@ManyToOne(() => Coach, (coach) => coach.students)
	coach?: Coach;

	// Si l'user est un coach
	@OneToOne(() => Coach, (coach) => coach.user)
	coachRole?: Coach;

	@OneToOne(() => UserDetails, (userDetails) => userDetails.user)
	userDetails!: UserDetails;

	@OneToMany(
		() => UserSportProgram,
		(userSportProgram) => userSportProgram.user,
	)
	userSportPrograms?: UserSportProgram[];

	@OneToMany(() => SessionBooking, (sessionBooking) => sessionBooking.user)
	sessionBooking?: SessionBooking[];

	@OneToMany(() => Message, (message) => message.sender)
	messages?: Message[];
}