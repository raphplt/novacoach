import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	OneToMany,
	ManyToOne,
} from "typeorm";
import { NutritionProgramMeal } from "./nutritionProgramMeal";
import { Structure } from "./structure";

@Entity()
export class Meal {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: true })
	name!: string;

	@Column()
	mealStarter!: string;

	@Column()
	mealMainCourse!: string;

	@Column()
	mainDessert!: string;

	@Column()
	complements!: string;

	@CreateDateColumn({ type: "time" })
	dayTime!: Date;

	@ManyToOne(() => Structure, (structure) => structure.meals)
	structure?: Structure;

	@OneToMany(
		() => NutritionProgramMeal,
		(nutritionProgramMeal) => nutritionProgramMeal.meal,
	)
	nutritionProgramsMeal?: NutritionProgramMeal[];
}