import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { NutritionProgram } from "./nutritionProgram";
import { Meal } from "./meal";

@Entity()
export class NutritionProgramMeal {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => NutritionProgram, (nutritionProgram) => nutritionProgram.nutritionProgramsMeal)
    nutritionProgram!: NutritionProgram;

    @ManyToOne(
        () => Meal,
        (meal) => meal.nutritionProgramsMeal
    )
    meal!: Meal;
}
