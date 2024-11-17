import { Request, Response } from 'express';
import { SportProgramServices } from '../services/sportProgram.service';

export class SportProgramController {
	private SportProgramService = new SportProgramServices();

	async getAllSportProgram(req: Request, res: Response): Promise<void> {
		try {
			const sportProgram =
				await this.SportProgramService.getAllSportProgram();
			res.status(200).json(sportProgram);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getSportProgramById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const sportProgram =
				await this.SportProgramService.getSportProgramById(id);
			if (sportProgram) {
				res.status(200).json(sportProgram);
			} else {
				res.status(404).json({ message: "sportProgram not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async addExerciseToProgram(req: Request, res: Response): Promise<void> {
		try {
			const { programId, exerciseId } = req.body;
			const sportProgramHasExercice =
				await this.SportProgramService.addExerciseToProgram(
					programId,
					exerciseId,
				);
			res.status(201).json(sportProgramHasExercice);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getSportProgramExercices(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const sportProgram =
				await this.SportProgramService.gerSportProgramExercices(id);
			if (sportProgram) {
				res.status(200).json(sportProgram);
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async deleteSportProgramExercice(
		req: Request,
		res: Response,
	): Promise<void> {
		try {
			const programId = parseInt(req.query.programId as string, 10);
			const exerciseId = parseInt(req.query.exerciseId as string, 10);

			if (isNaN(programId) || isNaN(exerciseId)) {
				res.status(400).json({
					error: "Invalid programId or exerciseId",
				});
				return;
			}

			const isDeleted =
				await this.SportProgramService.deleteExerciseFromProgram(
					String(programId),
					String(exerciseId),
				);
			if (isDeleted) {
				res.status(204).end();
			} else {
				res.status(404).json({
					message: "sportProgramExercice not found",
				});
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getSportProgramByStructureId(
		req: Request,
		res: Response,
	): Promise<void> {
		try {
			const { structureId } = req.params;
			const sportProgram =
				await this.SportProgramService.getSportProgramByStructureId(
					structureId,
				);
			if (sportProgram) {
				res.status(200).json(sportProgram);
			} else {
				res.status(404).json({ message: "sportProgram not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async createSportProgram(req: Request, res: Response): Promise<void> {
		try {
			const { idStructure, ...rest } = req.body;
			const sportProgram =
				await this.SportProgramService.createSportProgram({
					...rest,
					idStructure,
				});
			res.status(201).json(sportProgram);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async updateSportProgram(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const sportProgram =
				await this.SportProgramService.updateSportProgram(id, req.body);
			if (sportProgram) {
				res.status(200).json(sportProgram);
			} else {
				res.status(404).json({ message: "sportProgram not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async deleteSportProgram(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const isDeleted =
				await this.SportProgramService.deleteSportProgram(id);
			if (isDeleted) {
				res.status(204).end();
			} else {
				res.status(404).json({ message: "sportProgram not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}
