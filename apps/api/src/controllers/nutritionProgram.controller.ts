import { Request, Response } from "express";
import { NutritionProgramServices } from "../services/nutritionProgram.service";

export class NutritionProgramController {
	private NutritionProgramService = new NutritionProgramServices();

	async getAllNutritionProgram(req: Request, res: Response): Promise<void> {
		try {
			const nutritionProgram =
				await this.NutritionProgramService.getAllNutritionProgram();
			res.status(200).json(nutritionProgram);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getNutritionProgramById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const nutritionProgram =
				await this.NutritionProgramService.getNutritionProgramById(id);
			if (nutritionProgram) {
				res.status(200).json(nutritionProgram);
			} else {
				res.status(404).json({ message: "nutritionProgram not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async addMealToProgram(req: Request, res: Response): Promise<void> {
		try {
			const { programId, mealId } = req.body;
			const nutritionProgramHasExercice =
				await this.NutritionProgramService.addMealToProgram(
					programId,
					mealId,
				);
			res.status(201).json(nutritionProgramHasExercice);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async deleteNutritionProgramMeal(
		req: Request,
		res: Response,
	): Promise<void> {
		try {
			const programId = parseInt(req.query.programId as string, 10);
			const mealId = parseInt(req.query.mealId as string, 10);

			if (isNaN(programId) || isNaN(mealId)) {
				res.status(400).json({
					error: "Invalid programId or mealId",
				});
				return;
			}

			const isDeleted =
				await this.NutritionProgramService.deleteMealFromProgram(
					String(programId),
					String(mealId),
				);
			if (isDeleted) {
				res.status(204).end();
			} else {
				res.status(404).json({
					message: "nutritionProgramMeal not found",
				});
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getNutritionProgramMeal(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const nutritionProgram =
				await this.NutritionProgramService.gerNutritionProgramMeal(id);
			if (nutritionProgram) {
				res.status(200).json(nutritionProgram);
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getNutritionProgramByStructureId(req: Request, res: Response): Promise<void> {
		try {
			const { structureId } = req.params;
			const nutritionProgram =
				await this.NutritionProgramService.getNutritionProgramByStructureId(structureId);
			if (nutritionProgram) {
				res.status(200).json(nutritionProgram);
			} else {
				res.status(404).json({ message: "nutritionProgram not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async createNutritionProgram(req: Request, res: Response): Promise<void> {
		try {
			const nutritionProgram =
				await this.NutritionProgramService.createNutritionProgram(
					req.body,
				);
			res.status(201).json(nutritionProgram);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async updateNutritionProgram(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const nutritionProgram =
				await this.NutritionProgramService.updateNutritionProgram(
					id,
					req.body,
				);
			if (nutritionProgram) {
				res.status(200).json(nutritionProgram);
			} else {
				res.status(404).json({ message: "nutritionProgram not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async deleteNutritionProgram(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const isDeleted =
				await this.NutritionProgramService.deleteNutritionProgram(id);
			if (isDeleted) {
				res.status(204).end();
			} else {
				res.status(404).json({ message: "nutritionProgram not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}
