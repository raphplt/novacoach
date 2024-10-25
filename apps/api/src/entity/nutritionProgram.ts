import {
    Entity,
    PrimaryGeneratedColumn,
    Column, OneToMany,
} from "typeorm";
import { NutritionProgramMeal } from "./nutritionProgramMeal";

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

    @Column()
    idStructure!: number;

    @OneToMany(() => NutritionProgramMeal, (nutritionProgramMeal) => nutritionProgramMeal.nutritionProgram)
    nutritionProgramsMeal?: NutritionProgramMeal[];
}
