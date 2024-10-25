import { Request, Response } from "express";
import { UserDetailsService } from "../services/userdetails.service";

export class UserDetailsController {
	private userDetailsService = new UserDetailsService();

	async getAllUserDetails(req: Request, res: Response): Promise<void> {
		try {
			const userDetails =
				await this.userDetailsService.getAllUserDetails();
			res.status(200).json(userDetails);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getUserDetailsByUserId(req: Request, res: Response): Promise<void> {
		try {
			const { userId } = req.params;
			const userDetails =
				await this.userDetailsService.getUserDetailsByUserId(
					parseInt(userId, 10),
				);
			if (userDetails) {
				res.status(200).json(userDetails);
			} else {
				res.status(200).json({ message: "UserDetails not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async createUserDetails(req: Request, res: Response): Promise<void> {
		try {
			const userDetails = await this.userDetailsService.createUserDetails(
				req.body,
			);
			res.status(201).json(userDetails);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async createUserDetailsForUser(req: Request, res: Response): Promise<void> {
		try {
			const { userId } = req.params;
			const userDetails =
				await this.userDetailsService.createUserDetailsForUser(
					parseInt(userId, 10),
					req.body,
				);
			res.status(201).json(userDetails);
		} catch (error: any) {
			if (error.message === "User not found") {
				res.status(404).json({ message: error.message });
			} else {
				res.status(500).json({ error: error.message });
			}
		}
	}

	async updateUserDetails(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const userDetails = await this.userDetailsService.updateUserDetails(
				id,
				req.body,
			);
			if (userDetails) {
				res.status(200).json(userDetails);
			} else {
				res.status(404).json({ message: "UserDetails not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async deleteUserDetails(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const isDeleted =
				await this.userDetailsService.deleteUserDetails(id);
			if (isDeleted) {
				res.status(204).end();
			} else {
				res.status(404).json({ message: "UserDetails not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}
