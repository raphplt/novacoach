import { Request, Response } from "express";
import { AppDataSource } from "../../ormconfig";
import { UserTrackProgram } from "../entity/userTrackProgram";

export class UserTrackProgramController {
	private userTrackProgramRepository = AppDataSource.getRepository(UserTrackProgram);

	// Créer un UserTrackProgram
	async createUserTrackProgram(req: Request, res: Response): Promise<void> {
		try {
			const {
				userSportProgramId,
				coachId,
				startDate,
				endDate,
				iteration,
				levelDifficulty,
				commentaire,
			} = req.body;

			const newUserTrackProgram = this.userTrackProgramRepository.create({
				userSportProgram: { id: userSportProgramId },
				coach: { id: coachId },
				startDate,
				endDate,
				iteration,
				levelDifficulty,
				commentaire,
			});

			const savedUserTrackProgram = await this.userTrackProgramRepository.save(newUserTrackProgram);
			res.status(201).json(savedUserTrackProgram);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	// Récupérer tous les UserTrackPrograms
	async getAllUserTrackPrograms(req: Request, res: Response): Promise<void> {
		try {
			const userTrackPrograms = await this.userTrackProgramRepository.find({
				relations: ["userSportProgram", "sportProgram", "coach"],
			});
			res.status(200).json(userTrackPrograms);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	// Récupérer un UserTrackProgram par ID
	async getUserTrackProgramById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const userTrackProgram = await this.userTrackProgramRepository.findOne({
				where: { id: parseInt(id, 10) },
				relations: ["userSportProgram", "sportProgram", "coach"],
			});
			if (userTrackProgram) {
				res.status(200).json(userTrackProgram);
			} else {
				res.status(404).json({ message: "UserTrackProgram not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	// Mettre à jour un UserTrackProgram
	async updateUserTrackProgram(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const { startDate, endDate, iteration, levelDifficulty, commentaire } = req.body;

			const userTrackProgram = await this.userTrackProgramRepository.findOneBy({ id: parseInt(id, 10) });
			if (userTrackProgram) {
				Object.assign(userTrackProgram, { startDate, endDate, iteration, levelDifficulty, commentaire });
				const updatedUserTrackProgram = await this.userTrackProgramRepository.save(userTrackProgram);
				res.status(200).json(updatedUserTrackProgram);
			} else {
				res.status(404).json({ message: "UserTrackProgram not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	// Supprimer un UserTrackProgram
	async deleteUserTrackProgram(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const userTrackProgram = await this.userTrackProgramRepository.findOneBy({ id: parseInt(id, 10) });
			if (userTrackProgram) {
				await this.userTrackProgramRepository.remove(userTrackProgram);
				res.status(204).end();
			} else {
				res.status(404).json({ message: "UserTrackProgram not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}
