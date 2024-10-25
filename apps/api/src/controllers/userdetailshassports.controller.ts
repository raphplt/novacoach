import { Request, Response } from "express";
import { UserDetailsHasSportsService } from "../services/userdetailshassports.service";

export class UserDetailsHasSportsController {
	private userDetailsHasSportsService = new UserDetailsHasSportsService();

	async getAllUserDetailsHasSports(
		req: Request,
		res: Response,
	): Promise<void> {
		try {
			const userDetailsHasSports =
				await this.userDetailsHasSportsService.getAllUserDetailsHasSports();
			res.status(200).json(userDetailsHasSports);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async createUserDetailsHasSports(
		req: Request,
		res: Response,
	): Promise<void> {
		try {
			const userDetailsHasSports =
				await this.userDetailsHasSportsService.createUserDetailsHasSports(
					req.body,
				);
			res.status(201).json(userDetailsHasSports);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async updateUserDetailsHasSports(
		req: Request,
		res: Response,
	): Promise<void> {
		try {
			const { id } = req.params;
			const userDetailsHasSports =
				await this.userDetailsHasSportsService.updateUserDetailsHasSports(
					id,
					req.body,
				);
			if (userDetailsHasSports) {
				res.status(200).json(userDetailsHasSports);
			} else {
				res.status(404).json({
					message: "UserDetailsHasSports not found",
				});
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async deleteUserDetailsHasSports(
		req: Request,
		res: Response,
	): Promise<void> {
		try {
			const { id } = req.params;
			const isDeleted =
				await this.userDetailsHasSportsService.deleteUserDetailsHasSports(
					id,
				);
			if (isDeleted) {
				res.status(204).end();
			} else {
				res.status(404).json({
					message: "UserDetailsHasSports not found",
				});
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}
