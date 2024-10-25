import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";
import { SportProgram } from "./sportProgram";
import { Coach } from "./coach";

@Entity()
export class UserSportProgram {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => User, (user) => user.userSportPrograms)
	user!: User;

	@ManyToOne(
		() => SportProgram,
		(sportProgram) => sportProgram.userSportPrograms
	)
	sportProgram!: SportProgram;

	@ManyToOne(() => Coach)
	coach!: Coach;

	@Column({ type: "timestamp" })
	startDate!: Date;

	@Column({ type: "timestamp" })
	endDate!: Date;
}
