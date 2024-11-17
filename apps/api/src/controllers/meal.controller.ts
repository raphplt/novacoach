import { Request, Response } from "express";
import { MealServices } from "../services/meal.service";

export class MealController {
	private mealService = new MealServices();

	async getAllMeal(req: Request, res: Response): Promise<void> {
		try {
			const meal = await this.mealService.getAllMeal();
			res.status(200).json(meal);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getMealById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const meal = await this.mealService.getMealById(id);
			if (meal) {
				res.status(200).json(meal);
			} else {
				res.status(404).json({ message: "Meal not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getMealsByNutritionProgramId(req: Request, res: Response) {
        try {
			const { structureId } = req.params;

            const meals = await this.mealService.getMealsByNutritionProgramId(structureId);

            if (meals.length === 0) {
                return res.status(404).json({ message: "No meals found for this Nutrition Program" });
            }

            return res.json(meals);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error" });
        }
    }

	async getMealByStructureId(req: Request, res: Response): Promise<void> {
		try {
			const { structureId } = req.params;
			console.log("structureId", structureId);
			const meal = await this.mealService.getMealByStructureId(structureId);
			if (meal) {
				res.status(200).json(meal);
			}
		}
		catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async createMeal(req: Request, res: Response): Promise<void> {
		try {
			const meal = await this.mealService.createMeal(req.body);
			res.status(201).json(meal);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async updateMeal(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const meal = await this.mealService.updateMeal(id, req.body);
			if (meal) {
				res.status(200).json(meal);
			} else {
				res.status(404).json({ message: "Meal not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async deleteMeal(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const isDeleted = await this.mealService.deleteMeal(id);
			if (isDeleted) {
				res.status(204).end();
			} else {
				res.status(404).json({ message: "Meal not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}
