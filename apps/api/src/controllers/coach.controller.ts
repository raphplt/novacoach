import { Request, Response } from "express";
import { CoachService } from "../services/coach.service";

interface CoachInput {
	description: string;
	structureId?: number | null;
	user: any;
}

export class CoachController {
	private coachService = new CoachService();

	async getAllCoaches(req: Request, res: Response) {
		try {
			const coaches = await this.coachService.getAllCoaches();
			res.json(coaches);
		} catch (error) {
			res.status(500).json({
				message: "Erreur lors de la récupération des coachs.",
			});
		}
	}

	async getCoachById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const coach = await this.coachService.getCoachById(id);
			if (coach) {
				res.status(200).json(coach);
			} else {
				res.status(404).json({ message: "Coach not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getCoachByUserId(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const coach = await this.coachService.getCoachByUserId(id);
			if (coach) {
				res.status(200).json(coach);
			} else {
				res.status(404).json({ message: "Coach not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getCoachByStructureId(req: Request, res: Response): Promise<void> {
		try {
			const { structureId } = req.params;
			const coach = await this.coachService.getCoachesByStructureId(structureId);
			if (coach) {
				res.status(200).json(coach);
			} else {
				res.status(404).json({ message: "Coach not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async createCoach(req: Request, res: Response): Promise<void> {
		try {
			const coachData: CoachInput = req.body;
			const coach = await this.coachService.createCoach(coachData);
			res.status(201).json(coach);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async updateCoach(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const coachData: CoachInput = req.body;
			const coach = await this.coachService.updateCoach(id, coachData);
			if (coach) {
				res.status(200).json(coach);
			} else {
				res.status(404).json({ message: "Coach not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async deleteCoach(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const isDeleted = await this.coachService.deleteCoach(id);
			if (isDeleted) {
				res.status(204).end();
			} else {
				res.status(404).json({ message: "Coach not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}