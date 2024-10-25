import { Request, Response } from "express";
import { NutritionProgramMealService } from "../services/nutritionProgramMeal.service";

export class NutritionProgramMealController {
	private nutritionProgramMealService = new NutritionProgramMealService();

	async getAllNutritionProgramsMeal(
		req: Request,
		res: Response,
	): Promise<void> {
		try {
			const nutritionProgramMeal =
				await this.nutritionProgramMealService.getAllNutritionProgramsMeal();
			res.status(200).json(nutritionProgramMeal);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getNutritionProgramMealById(
		req: Request,
		res: Response,
	): Promise<void> {
		try {
			const { id } = req.params;
			const nutritionProgramMeal =
				await this.nutritionProgramMealService.getNutritionProgramMealById(
					id,
				);
			if (nutritionProgramMeal) {
				res.status(200).json(nutritionProgramMeal);
			} else {
				res.status(404).json({
					message: "Nutrition program meal not found",
				});
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async createNutritionProgramMeal(
		req: Request,
		res: Response,
	): Promise<void> {
		try {
			const nutritionProgramMeal =
				await this.nutritionProgramMealService.createNutritionProgramMeal(
					req.body,
				);
			res.status(201).json(nutritionProgramMeal);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async updateNutritionProgramMeal(
		req: Request,
		res: Response,
	): Promise<void> {
		try {
			const { id } = req.params;
			const nutritionProgramMeal =
				await this.nutritionProgramMealService.updateNutritionProgramMeal(
					id,
					req.body,
				);
			if (nutritionProgramMeal) {
				res.status(200).json(nutritionProgramMeal);
			} else {
				res.status(404).json({
					message: "Nutrition program meal not found",
				});
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async deleteNutritionProgramMeal(
		req: Request,
		res: Response,
	): Promise<void> {
		try {
			const { id } = req.params;
			const isDeleted =
				await this.nutritionProgramMealService.deleteNutritionProgramMeal(
					id,
				);
			if (isDeleted) {
				res.status(204).end();
			} else {
				res.status(404).json({
					message: "Nutrition program meal not found",
				});
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}
