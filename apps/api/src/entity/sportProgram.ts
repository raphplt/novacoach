import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
} from "typeorm";
import { Sport } from "./sport";
import { UserSportProgram } from "./userSportProgram";
import { SportProgramHasExercice } from "./sportProgramHasExercice";
import { Structure } from "./structure";

@Entity()
export class SportProgram {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column()
	difficulty!: string;

	@Column()
	duration!: number;

	@Column()
	frequency!: number;

	@ManyToOne(() => Sport, (sport: Sport) => sport.id)
	sport!: Sport;

	// Relations

	@ManyToOne(() => Structure, (structure) => structure.sportPrograms)
	structure?: Structure;

	@OneToMany(
		() => UserSportProgram,
		(userSportProgram) => userSportProgram.sportProgram,
	)
	userSportPrograms?: UserSportProgram[];

	@OneToMany(
		() => SportProgramHasExercice,
		(sportProgramHasExercice) => sportProgramHasExercice.sportProgram,
	)
	sportProgramHasExercices?: SportProgramHasExercice[];
}
