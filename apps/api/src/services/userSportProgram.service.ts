import { AppDataSource } from "../../ormconfig";
import { UserSportProgram } from "../entity/userSportProgram";

export class UserSportProgramService {
	private userSportProgramRepository =
		AppDataSource.getRepository(UserSportProgram);

	async getAllUserSportPrograms(): Promise<UserSportProgram[]> {
		return this.userSportProgramRepository.find();
	}

	async getUserSportProgramById(
		id: string,
	): Promise<UserSportProgram | null> {
		const parsedId = parseInt(id, 10);
		return this.userSportProgramRepository.findOneBy({
			id: parsedId,
		});
	}

	async getUserSportProgramByUserId(
		userId: string,
	): Promise<UserSportProgram | null> {
		const parsedUserId = parseInt(userId, 10);
		return this.userSportProgramRepository.findOne({
			where: { user: { id: parsedUserId } },
			relations: [
				"sportProgram",
				"sportProgram.sportProgramHasExercices",
				"sportProgram.sportProgramHasExercices.exercice",
			],
		});
	}

	async createUserSportProgram(
		userSportProgram: Partial<UserSportProgram>,
	): Promise<UserSportProgram> {
		const newUserSportProgram =
			this.userSportProgramRepository.create(userSportProgram);
		return this.userSportProgramRepository.save(newUserSportProgram);
	}

	async updateUserSportProgram(
		id: string,
		userSportProgram: Partial<UserSportProgram>,
	): Promise<UserSportProgram | null> {
		const parsedId = parseInt(id, 10);
		const userSportProgramToUpdate =
			await this.userSportProgramRepository.findOneBy({ id: parsedId });
		if (userSportProgramToUpdate) {
			Object.assign(userSportProgramToUpdate, userSportProgram);
			return this.userSportProgramRepository.save(
				userSportProgramToUpdate,
			);
		}
		return null;
	}

	async deleteUserSportProgram(id: string): Promise<boolean> {
		const parsedId = parseInt(id, 10);
		const userSportProgramToDelete =
			await this.userSportProgramRepository.findOneBy({ id: parsedId });
		if (userSportProgramToDelete) {
			await this.userSportProgramRepository.remove(
				userSportProgramToDelete,
			);
			return true;
		}
		return false;
	}
}