import { AppDataSource } from "../../ormconfig";
import { Meal } from "../entity/meal";
import { NutritionProgramMeal } from "../entity/nutritionProgramMeal";

export class MealServices {
	private mealRepository = AppDataSource.getRepository(Meal);
	private nutritionProgramMealRepository = AppDataSource.getRepository(NutritionProgramMeal);
	async getAllMeal(): Promise<Meal[]> {
		return this.mealRepository.find();
	}

	async getMealById(id: string): Promise<Meal | null> {
		const parsedId = parseInt(id, 10);
		return this.mealRepository.findOneBy({
			id: parsedId,
		});
	}

	async getMealsByNutritionProgramId(nutritionProgramId: string): Promise<Meal[]> {
		const parseId = parseInt(nutritionProgramId, 10);
        const nutritionProgramMeals = await this.nutritionProgramMealRepository.find({
            where: { nutritionProgram: { id: parseId } },
            relations: ['meal'],  
        });

        const meals = nutritionProgramMeals.map(npm => npm.meal);

		console.log(meals);
        return meals;
    }

	async createMeal(meal: Partial<Meal>): Promise<Meal> {
		const newMeal = this.mealRepository.create(meal);
		return this.mealRepository.save(newMeal);
	}

	async updateMeal(id: string, meal: Partial<Meal>): Promise<Meal | null> {
		const parsedId = parseInt(id, 10);
		const mealToUpdate = await this.mealRepository.findOneBy({
			id: parsedId,
		});
		if (mealToUpdate) {
			Object.assign(mealToUpdate, meal);
			return this.mealRepository.save(mealToUpdate);
		}
		return null;
	}

	async deleteMeal(id: string): Promise<boolean> {
		const parsedId = parseInt(id, 10);
		const mealToDelete = await this.mealRepository.findOneBy({
			id: parsedId,
		});
		if (mealToDelete) {
			await this.mealRepository.remove(mealToDelete);
			return true;
		}
		return false;
	}
}
