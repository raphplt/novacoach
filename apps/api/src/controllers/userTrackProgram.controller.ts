import { Request, Response } from "express";
import { UserTrackProgramService } from "../services/userTrackProgram.service";

export class UserTrackProgramController {
	private userTrackProgramService = new UserTrackProgramService();

	async createUserTrackProgram(req: Request, res: Response): Promise<void> {
		try {
			const newUserTrackProgram =
				await this.userTrackProgramService.createUserTrackProgram(
					req.body,
				);
			res.status(201).json(newUserTrackProgram);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getAllUserTrackPrograms(req: Request, res: Response): Promise<void> {
		try {
			const userTrackPrograms =
				await this.userTrackProgramService.getAllUserTrackPrograms();
			res.status(200).json(userTrackPrograms);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getUserTrackProgramById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const userTrackProgram =
				await this.userTrackProgramService.getUserTrackProgramById(
					parseInt(id, 10),
				);
			if (userTrackProgram) {
				res.status(200).json(userTrackProgram);
			} else {
				res.status(404).json({ message: "UserTrackProgram not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async updateUserTrackProgram(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const updatedUserTrackProgram =
				await this.userTrackProgramService.updateUserTrackProgram(
					parseInt(id, 10),
					req.body,
				);
			if (updatedUserTrackProgram) {
				res.status(200).json(updatedUserTrackProgram);
			} else {
				res.status(404).json({ message: "UserTrackProgram not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async deleteUserTrackProgram(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const isDeleted =
				await this.userTrackProgramService.deleteUserTrackProgram(
					parseInt(id, 10),
				);
			if (isDeleted) {
				res.status(204).end();
			} else {
				res.status(404).json({ message: "UserTrackProgram not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getUserTrackProgramsLast7Days(
		req: Request,
		res: Response,
	): Promise<void> {
		try {
			const { userId } = req.params;
			const userTrackPrograms =
				await this.userTrackProgramService.getUserTrackProgramsLast7Days(
					parseInt(userId, 10),
				);
			res.status(200).json(userTrackPrograms);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}