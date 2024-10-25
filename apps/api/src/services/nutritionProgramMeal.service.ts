import { AppDataSource } from "../../ormconfig";
import { NutritionProgramMeal } from "../entity/nutritionProgramMeal";

export class NutritionProgramMealService {
	private nutritionProgramMealRepository =
		AppDataSource.getRepository(NutritionProgramMeal);
	async getAllNutritionProgramsMeal(): Promise<NutritionProgramMeal[]> {
		return this.nutritionProgramMealRepository.find();
	}
	async getNutritionProgramMealById(
		id: string,
	): Promise<NutritionProgramMeal | null> {
		const parsedId = parseInt(id, 10);
		return this.nutritionProgramMealRepository.findOneBy({
			id: parsedId,
		});
	}
	async createNutritionProgramMeal(
		nutritionProgramMeal: Partial<NutritionProgramMeal>,
	): Promise<NutritionProgramMeal> {
		const newNutritionProgramMeal =
			this.nutritionProgramMealRepository.create(nutritionProgramMeal);
		return this.nutritionProgramMealRepository.save(
			newNutritionProgramMeal,
		);
	}
	async updateNutritionProgramMeal(
		id: string,
		nutritionProgramMeal: Partial<NutritionProgramMeal>,
	): Promise<NutritionProgramMeal | null> {
		const parsedId = parseInt(id, 10);
		const nutritionProgramMealToUpdate =
			await this.nutritionProgramMealRepository.findOneBy({
				id: parsedId,
			});
		if (nutritionProgramMealToUpdate) {
			Object.assign(nutritionProgramMealToUpdate, nutritionProgramMeal);
			return this.nutritionProgramMealRepository.save(
				nutritionProgramMealToUpdate,
			);
		}
		return null;
	}
	async deleteNutritionProgramMeal(id: string): Promise<boolean> {
		const parsedId = parseInt(id, 10);
		const nutritionProgramMealToDelete =
			await this.nutritionProgramMealRepository.findOneBy({
				id: parsedId,
			});
		if (nutritionProgramMealToDelete) {
			await this.nutritionProgramMealRepository.remove(
				nutritionProgramMealToDelete,
			);
			return true;
		}
		return false;
	}
}
