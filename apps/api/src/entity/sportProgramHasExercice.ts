import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
} from "typeorm";
import { SportProgram } from "./sportProgram";
import { Exercice } from "./exercice";

@Entity()
export class SportProgramHasExercice {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => SportProgram, (sportProgram) => sportProgram.sportProgramHasExercices)
	sportProgram!: SportProgram;

	@ManyToOne(() => Exercice, (exercice) => exercice.sportProgramHasExercices)
	exercice!: Exercice;
}
