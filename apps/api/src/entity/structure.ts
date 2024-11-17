import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Coach } from "./coach";
import { User } from "./user";
import { SportProgram } from "./sportProgram";
import { NutritionProgram } from "./nutritionProgram";
import { Exercice } from "./exercice";
import { Meal } from "./meal";
import { Bill } from "./bill";

@Entity()
export class Structure {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column({ nullable: true })
	description?: string;

	@Column()
	address?: string;

	@Column()
	phone?: string;

	@Column({ nullable: true })
	logo?: string;

	@CreateDateColumn({ type: "timestamp" })
	createDate!: Date;

	@UpdateDateColumn({ type: "timestamp" })
	updateDate!: Date;

	// Relations
	@OneToMany(() => User, (user) => user.structure, { onDelete: "CASCADE" })
	users?: User[];

	@OneToMany(() => Coach, (coach) => coach.structure, { onDelete: "CASCADE" })
	coaches?: Coach[];

	@OneToMany(() => SportProgram, (sportProgram) => sportProgram.structure, {
		onDelete: "CASCADE",
	})
	sportPrograms?: SportProgram[];

	@OneToMany(() => Exercice, (exercice) => exercice.structure, {
		onDelete: "CASCADE",
	})
	exercices?: Exercice[];

	@OneToMany(() => Meal, (meal) => meal.structure)
	meals?: Meal[];

	@OneToMany(() => Bill, (bill) => bill.structure)
	bills?: Bill[];

	@OneToMany(
		() => NutritionProgram,
		(nutritionProgram) => nutritionProgram.structure,
		{ onDelete: "CASCADE" },
	)
	nutritionPrograms?: NutritionProgram[];
}