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

	@Column()
	idStructure!: number;

	@OneToMany(
		() => UserSportProgram,
		(userSportProgram) => userSportProgram.sportProgram
	)
	userSportPrograms?: UserSportProgram[];

	@OneToMany(
		() => SportProgramHasExercice,
		(sportProgramHasExercice) => sportProgramHasExercice.sportProgram
	)
	sportProgramHasExercices?: SportProgramHasExercice[];
	
}
