import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { SportProgram } from "./sportProgram";
import { Coach } from "./coach";
import { UserSportProgram } from "./userSportProgram";

@Entity()
export class UserTrackProgram {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: "timestamp" })
	startDate!: Date;

	@Column({ type: "timestamp" })
	endDate!: Date;

	@Column({ nullable: true })
	iteration!: number;

	@Column({ nullable: true })
	levelDifficulty!: number;

	@Column({ nullable: true })
	commentaire!: string;

	@ManyToOne(
		() => UserSportProgram,
		(userSportProgram) => userSportProgram.userTrackProgram,
		{
			onDelete: "CASCADE",
			nullable: true,
		},
	)
	userSportProgram?: UserSportProgram;

	@ManyToOne(() => Coach, (coach) => coach.userTrackPrograms, {
		onDelete: "CASCADE",
		nullable: true,
	})
	coach?: Coach;
}
