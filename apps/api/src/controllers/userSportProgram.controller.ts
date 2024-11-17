import { UserSportProgramService } from "../services/userSportProgram.service";
import { Request, Response } from "express";

export class UserSportProgramController {
	private userSportProgramService = new UserSportProgramService();

	async getAllUserSportPrograms(req: Request, res: Response): Promise<void> {
		try {
			const userSportProgram =
				await this.userSportProgramService.getAllUserSportPrograms();
			res.status(200).json(userSportProgram);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getUserSportProgramById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const userSportProgram =
				await this.userSportProgramService.getUserSportProgramById(id);
			if (userSportProgram) {
				res.status(200).json(userSportProgram);
			} else {
				res.status(404).json({
					message: "User Sport Program not found",
				});
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getUserSportProgramByUserId(
		req: Request,
		res: Response,
	): Promise<void> {
		try {
			const { userId } = req.params;
			const userSportProgram =
				await this.userSportProgramService.getUserSportProgramByUserId(
					userId,
				);
			if (userSportProgram) {
				res.status(200).json(userSportProgram);
			} else {
				res.status(404).json({
					message: "User Sport Program not found",
				});
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async createUserSportProgram(req: Request, res: Response): Promise<void> {
		try {
			const userSportProgram =
				await this.userSportProgramService.createUserSportProgram(
					req.body,
				);
			res.status(201).json(userSportProgram);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async updateUserSportProgram(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const userSportProgram =
				await this.userSportProgramService.updateUserSportProgram(
					id,
					req.body,
				);
			if (userSportProgram) {
				res.status(200).json(userSportProgram);
			} else {
				res.status(404).json({
					message: "User Sport Program not found",
				});
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async deleteUserSportProgram(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const isDeleted =
				await this.userSportProgramService.deleteUserSportProgram(id);
			if (isDeleted) {
				res.status(204).end();
			} else {
				res.status(404).json({
					message: "User Sport Program not found",
				});
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}