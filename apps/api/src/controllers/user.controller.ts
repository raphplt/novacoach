import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserNotFoundError, EmailAlreadyExistsError } from "../errors/users.errors";

export class UserController {
	private userService = new UserService();

	async getAllUsers(req: Request, res: Response): Promise<void> {
		try {
			const users = await this.userService.getAllUsers();
			res.status(200).json(users);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getUserById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const user = await this.userService.getUserById(id);
			res.status(200).json(user);
		} catch (error: any) {
			if (error instanceof UserNotFoundError) {
				res.status(404).json({ error: error.message });
			} else {
				res.status(500).json({ error: error.message });
			}
		}
	}

	async getUserByCoachId(req: Request, res: Response): Promise<void> {
		try {
			const { coachId } = req.params;

				const { user, coach } =
					await this.userService.getUserByCoachID(coachId);

			res.status(200).json({ user, coach });
		} catch (error: any) {
			if (error instanceof UserNotFoundError) {
				res.status(404).json({ error: error.message });
			} else {
				res.status(500).json({ error: error.message });
			}
		}
	}

	async getStudentByStructureID(req: Request, res: Response): Promise<void> {
		try {
			const { structureId } = req.params;
			const students = await this.userService.getStudentsByStructureId(structureId);

			res.status(200).json(students);
		} catch (error: any) {
			if (error instanceof UserNotFoundError) {
				res.status(404).json({ error: error.message });
			} else {
				res.status(500).json({ error: error.message });
			}
		}
	}

	async getStudentByCoachID(req: Request, res: Response): Promise<void> {
		try {
			const { coachId } = req.params;
			const students =
				await this.userService.getStudentsByCoachId(coachId);

			res.status(200).json(students);
		} catch (error: any) {
			if (error instanceof UserNotFoundError) {
				res.status(404).json({ error: error.message });
			} else {
				res.status(500).json({ error: error.message });
			}
		}
	}


	// Register a new user
	async createUser(req: Request, res: Response): Promise<void> {
		try {
			const { roleName, ...userData } = req.body;
			const user = await this.userService.createUser(userData, roleName);
			res.status(201).json(user);
		} catch (error: any) {
			if (error instanceof EmailAlreadyExistsError) {
				res.status(400).json({ error: error.message });
			} else {
				res.status(500).json({ error: error.message });
			}
		}
	}

	// Login a user
	async loginUser(req: Request, res: Response): Promise<void> {
		try {
			const { email, password } = req.body;
			const user = await this.userService.getUserByEmail(email);
			if (
				user &&
				(await this.userService.validateUserPassword(email, password))
			) {
				res.status(200).json({
					message: "Login successful",
					userId: user.id,
				});
			} else {
				res.status(401).json({ message: "Invalid credentials" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	// Get user profil
	async getProfile(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const user = await this.userService.getUserById(id);
			if (!user) {
				res.status(404).json({ message: "User not found" });
				return;
			}
			const { password, ...userWithoutPassword } = user;
			res.status(200).json(userWithoutPassword);
		} catch (error: any) {
			if (error instanceof UserNotFoundError) {
				res.status(404).json({ error: error.message });
			} else {
				res.status(500).json({ error: error.message });
			}
		}
	}

	async updateUser(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const user = await this.userService.updateUser(id, req.body);
			if (user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({ message: "User not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async deleteUser(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const isDeleted = await this.userService.deleteUser(id);
			if (isDeleted) {
				res.status(204).end();
			} else {
				res.status(404).json({ message: "User not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}
