import { AppDataSource } from "../../ormconfig";
import { Meal } from "../entity/meal";
import { NutritionProgramMeal } from "../entity/nutritionProgramMeal";
import { Structure } from "../entity/structure";

export class MealServices {
	private mealRepository = AppDataSource.getRepository(Meal);
	private nutritionProgramMealRepository =
		AppDataSource.getRepository(NutritionProgramMeal);
	private structureRepository = AppDataSource.getRepository(Structure);
	async getAllMeal(): Promise<Meal[]> {
		return this.mealRepository.find();
	}

	async getMealById(id: string): Promise<Meal | null> {
		const parsedId = parseInt(id, 10);
		return this.mealRepository.findOneBy({
			id: parsedId,
		});
	}

	async getMealsByNutritionProgramId(
		nutritionProgramId: string,
	): Promise<Meal[]> {
		console.log("nutritionProgramId", nutritionProgramId);
		const parseId = parseInt(nutritionProgramId, 10);
		console.log("parseId", parseId);
		const nutritionProgramMeals =
			await this.nutritionProgramMealRepository.find({
				where: { nutritionProgram: { id: parseId } },
				relations: ["meal"],
			});

		const meals = nutritionProgramMeals.map((npm) => npm.meal);

		return meals;
	}

	async getMealByStructureId(structureId: string): Promise<Meal[]> {
		try {
			const parseId = parseInt(structureId, 10);
			console.log("parseId", parseId);
			const meal = await this.mealRepository.find({
				where: { structure: { id: parseId } },
			});

			if (meal.length === 0) {
				console.log(`No meals found for structure ID: ${parseId}`);
				return [];
			}

			return meal;
		} catch (error) {
			console.error("Error fetching meals:", error);
			throw new Error(
				`Failed to fetch meals for structure ID: ${structureId}`,
			);
		}
	}

	async createMeal(
		meal: Partial<Meal> & { idStructure: number },
	): Promise<Meal> {
		const structure = await this.structureRepository.findOne({
			where: { id: meal.idStructure },
		});
		if (!structure) {
			throw new Error(`Structure with id ${meal.idStructure} not found`);
		}

		const newMeal = this.mealRepository.create({
			...meal,
			structure: structure,
		});

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
