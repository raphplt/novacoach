import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	OneToMany,
} from "typeorm";
import { NutritionProgramMeal } from "./nutritionProgramMeal";

@Entity()
export class Meal {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	mealStarter!: string;

	@Column()
	mealMainCourse!: string;

	@Column()
	mainDessert!: string;

	@CreateDateColumn({ type: "timestamp" })
	endDate!: Date;

	@Column()
	complements!: string;

	@CreateDateColumn({ type: "time" })
	dayTime!: Date;

	@OneToMany(
		() => NutritionProgramMeal,
		(nutritionProgramMeal) => nutritionProgramMeal.meal,
	)
	nutritionProgramsMeal?: NutritionProgramMeal[];
}