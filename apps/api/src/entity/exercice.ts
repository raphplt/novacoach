import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToOne,
} from "typeorm";
import { SportProgramHasExercice } from "./sportProgramHasExercice";
import { Structure } from "./structure";

@Entity()
export class Exercice {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column()
	description!: string;

	@Column({ nullable: true })
	duration?: number;

	@Column({ nullable: true })
	reps?: number;

	@Column({ nullable: true })
	sets?: number;

	@Column({ nullable: true })
	breakTime?: number;

	@Column({ nullable: true })
	image?: string;

	@ManyToOne(() => Structure, (structure) => structure.exercices)
	structure?: Structure;

	@OneToMany(
		() => SportProgramHasExercice,
		(sportProgramHasExercice) => sportProgramHasExercice.exercice,
	)
	sportProgramHasExercices?: SportProgramHasExercice[];
}
