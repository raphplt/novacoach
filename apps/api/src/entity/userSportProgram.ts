import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";
import { SportProgram } from "./sportProgram";
import { Coach } from "./coach";
import { UserTrackProgram } from "./userTrackProgram";

@Entity()
export class UserSportProgram {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => User, (user) => user.userSportPrograms)
	user!: User;

	@ManyToOne(
		() => UserTrackProgram,
		(UserTrackProgram) => UserTrackProgram.userSportProgram,
	)
	userTrackProgram!: UserTrackProgram;

	@ManyToOne(
		() => SportProgram,
		(sportProgram) => sportProgram.userSportPrograms,
	)
	sportProgram!: SportProgram;

	@ManyToOne(() => Coach)
	coach!: Coach;

	@Column({ type: "timestamp" })
	startDate!: Date;

	@Column({ type: "timestamp" })
	endDate!: Date;
}
