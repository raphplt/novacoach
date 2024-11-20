import * as bcrypt from "bcrypt";
import { AppDataSource } from "../../ormconfig";
import { User } from "../entity/user";
import {
	UserNotFoundError,
	EmailAlreadyExistsError,
} from "../errors/users.errors";
import { Role } from "../entity/role";
import { Coach } from "../entity/coach";
import { v2 as cloudinary } from "cloudinary";
import { Structure } from "../entity/structure";

export class UserService {
	private userRepository = AppDataSource.getRepository(User);
	private coachRepository = AppDataSource.getRepository(Coach);
	private roleRepository = AppDataSource.getRepository(Role);
	private structureRepository = AppDataSource.getRepository(Structure);

	async getAllUsers(): Promise<User[]> {
		return this.userRepository.find();
	}

	// Upload ou met à jour l'image de profil d'un utilisateur
	async uploadUserProfileImage(
		userId: string,
		filePath: string,
	): Promise<User> {
		const parsedId = parseInt(userId, 10);
		const user = await this.userRepository.findOne({
			where: { id: parsedId },
		});

		if (!user) {
			throw new UserNotFoundError();
		}

		// Supprime l'ancienne image de profil de Cloudinary, si elle existe
		if (user.profileImageUrl) {
			const publicId = this.getCloudinaryPublicId(user.profileImageUrl);
			await cloudinary.uploader.destroy(publicId);
		}

		// Upload de la nouvelle image sur Cloudinary
		const uploadResult = await cloudinary.uploader.upload(filePath, {
			folder: "user_profiles", // Dossier optionnel dans Cloudinary
			resource_type: "image",
		});

		// Met à jour l'URL de l'image de profil dans l'entité utilisateur
		user.profileImageUrl = uploadResult.secure_url;
		await this.userRepository.save(user);

		// Récupère l'utilisateur avec les relations spécifiées
		const updatedUser = await this.userRepository.findOne({
			where: { id: parsedId },
			relations: [
				"role",
				"userDetails.weights",
				"userDetails.fatMasses",
				"userDetails.bmis",
				"userDetails.heights",
				"userDetails.muscleMasses",
				"userDetails.sports",
				"userDetails.goals",
				"userDetails.licences",
				"coach",
				"coachRole",
				"userSportPrograms",
				"sessionBooking",
				"structure",
				"userSportPrograms.sportProgram",
			],
		});

		if (!updatedUser) return user;

		return updatedUser;
	}

	// Helper pour obtenir le publicId à partir de l'URL complète
	private getCloudinaryPublicId(url: string): string {
		const parts = url.split("/");
		return parts[parts.length - 1].split(".")[0];
	}

	async getUserById(id: string): Promise<User | null> {
		const parsedId = parseInt(id, 10);
		const user = await this.userRepository.findOne({
			where: { id: parsedId },
			relations: [
				"role",
				"userDetails.weights",
				"userDetails.fatMasses",
				"userDetails.bmis",
				"userDetails.heights",
				"userDetails.muscleMasses",
				"userDetails.sports",
				"userDetails.goals",
				"userDetails.licences",
				"coach",
				"coachRole",
				"userSportPrograms",
				"sessionBooking",
				"structure",
				"userSportPrograms.sportProgram",
			],
		});
		if (!user) {
			throw new UserNotFoundError();
		}
		return user;
	}

	async getUserByEmail(email: string): Promise<User | null> {
		return this.userRepository.findOne({
			where: { email },
			relations: [
				"role",
				"userDetails.weights",
				"userDetails.fatMasses",
				"userDetails.bmis",
				"userDetails.heights",
				"userDetails.muscleMasses",
				"userDetails.sports",
				"userDetails.goals",
				"userDetails.licences",
				"coach",
				"coachRole",
				"userSportPrograms",
				"sessionBooking",
				"structure",
				"userSportPrograms.sportProgram",
			],
		});
	}

	async getUserByCoachID(id: string): Promise<{ user: User; coach: Coach }> {
		const parsedId = parseInt(id, 10);

		const coach = await this.coachRepository.findOne({
			where: { id: parsedId },
			relations: ["user"],
		});

		if (!coach) {
			throw new UserNotFoundError();
		}

		return {
			user: coach.user,
			coach: coach,
		};
	}

	async getStudentsByStructureId(structureId: string): Promise<User[]> {
		const parsedId = parseInt(structureId, 10);

		const students = await this.userRepository.find({
			where: {
				structure: { id: parsedId },
				role: { id: 3 },
			},
			relations: ["coach", "coach.user"],
		});

		return students;
	}

	async getStudentsByCoachId(coachId: string): Promise<User[]> {
		const parsedId = parseInt(coachId, 10);

		const students = await this.userRepository.find({
			where: {
				coach: { id: parsedId },
				role: { id: 3 },
			},
			relations: [
				"userDetails",
				"userDetails.weights",
				"userDetails.fatMasses",
				"userDetails.bmis",
				"userDetails.heights",
				"userDetails.muscleMasses",
				"userDetails.sports",
				"userDetails.goals",
				"userDetails.licences",
			],
		});
		return students;
	}

	async createUser(user: Partial<User>, roleName: string): Promise<User> {
		const existingUser = await this.userRepository.findOne({
			where: { email: user.email },
		});
		if (existingUser) {
			throw new EmailAlreadyExistsError();
		}

		if (user.password) {
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(user.password, salt);
		}

		const role = await this.roleRepository.findOneBy({ name: roleName });
		if (!role) {
			throw new Error(`Role ${roleName} not found`);
		}

		const newUser = this.userRepository.create({ ...user, role });
		return this.userRepository.save(newUser);
	}

	async validateUserPassword(
		email: string,
		password: string,
	): Promise<boolean> {
		const user = await this.getUserByEmail(email);
		if (user && user.password) {
			return bcrypt.compare(password, user.password);
		}
		return false;
	}

	async updateUser(id: string, user: Partial<User>): Promise<User | null> {
		const parsedId = parseInt(id, 10);
		const userToUpdate = await this.userRepository.findOne({
			where: { id: parsedId },
			relations: [
				'role',
				'userDetails',
				'coach',
				'userSportPrograms',
				'structure',
			],
		});

		if (userToUpdate) {
				const structure = await this.structureRepository.findOne({
					where: { id: user.structure?.id },
				});

				if (structure) {
					userToUpdate.structure = structure;
				} else {
					console.log(`Structure with id ${user.structure} not found.`);
					return null;
			}

			Object.assign(userToUpdate, user);
			await this.userRepository.save(userToUpdate);
			const updatedUser = await this.userRepository.findOne({
				where: { id: parsedId },
				relations: [
					'role',
					'userDetails',
					'coach',
					'userSportPrograms',
					'structure',
				],
			});

			return updatedUser;
		}
		return null;
	}


	async deleteUser(id: string): Promise<boolean> {
		const parsedId = parseInt(id, 10);
		const userToDelete = await this.userRepository.findOneBy({
			id: parsedId,
		});
		if (userToDelete) {
			await this.userRepository.remove(userToDelete);
			return true;
		}
		return false;
	}
}
