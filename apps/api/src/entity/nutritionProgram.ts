import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToOne,
} from "typeorm";
import { NutritionProgramMeal } from "./nutritionProgramMeal";
import { Structure } from "./structure";

@Entity()
export class NutritionProgram {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column()
	duration!: number;

	@Column()
	frequency!: number;

	@ManyToOne(() => Structure, (structure) => structure.nutritionPrograms)
	structure?: Structure;

	@OneToMany(
		() => NutritionProgramMeal,
		(nutritionProgramMeal) => nutritionProgramMeal.nutritionProgram,
	)
	nutritionProgramsMeal?: NutritionProgramMeal[];
}
