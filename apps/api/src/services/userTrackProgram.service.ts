import { AppDataSource } from "../../ormconfig";
import { UserTrackProgram } from "../entity/userTrackProgram";
import { UserSportProgram } from "../entity/userSportProgram";
import { Coach } from "../entity/coach";
import { Between } from "typeorm";

export class UserTrackProgramService {
	private userTrackProgramRepository =
		AppDataSource.getRepository(UserTrackProgram);
	private userSportProgramRepository =
		AppDataSource.getRepository(UserSportProgram);
	private coachRepository = AppDataSource.getRepository(Coach);

	async createUserTrackProgram(data: any): Promise<UserTrackProgram> {
		const {
			userSportProgramId,
			coachId,
			startDate,
			endDate,
			iteration,
			levelDifficulty,
			commentaire,
		} = data;

		const userSportProgram =
			await this.userSportProgramRepository.findOneBy({
				id: userSportProgramId,
			});
		if (!userSportProgram) {
			throw new Error("UserSportProgram not found");
		}

		const coach = await this.coachRepository.findOneBy({ id: coachId });
		if (!coach) {
			throw new Error("Coach not found");
		}

		const newUserTrackProgram = this.userTrackProgramRepository.create({
			userSportProgram,
			coach,
			startDate,
			endDate,
			iteration,
			levelDifficulty,
			commentaire,
		});

		return this.userTrackProgramRepository.save(newUserTrackProgram);
	}

	async getAllUserTrackPrograms(): Promise<UserTrackProgram[]> {
		return this.userTrackProgramRepository.find({
			relations: [
				"userSportProgram",
				"userSportProgram.sportProgram",
				"coach",
			],
		});
	}

	async getUserTrackProgramById(
		id: number,
	): Promise<UserTrackProgram | null> {
		return this.userTrackProgramRepository.findOne({
			where: { id },
			relations: [
				"userSportProgram",
				"userSportProgram.sportProgram",
				"coach",
			],
		});
	}

	async updateUserTrackProgram(
		id: number,
		data: any,
	): Promise<UserTrackProgram | null> {
		const userTrackProgram =
			await this.userTrackProgramRepository.findOneBy({ id });
		if (!userTrackProgram) {
			return null;
		}

		Object.assign(userTrackProgram, data);
		return this.userTrackProgramRepository.save(userTrackProgram);
	}

	async deleteUserTrackProgram(id: number): Promise<boolean> {
		const userTrackProgram =
			await this.userTrackProgramRepository.findOneBy({ id });
		if (!userTrackProgram) {
			return false;
		}

		await this.userTrackProgramRepository.remove(userTrackProgram);
		return true;
	}

	async getUserTrackProgramsLast7Days(
		userId: number,
	): Promise<UserTrackProgram[]> {
		const today = new Date();
		const last7Days = new Date();
		last7Days.setDate(today.getDate() - 7);

		return this.userTrackProgramRepository.find({
			where: {
				userSportProgram: {
					user: { id: userId },
				},
				startDate: Between(last7Days, today),
			},
			relations: ["userSportProgram", "userSportProgram.user", "coach"],
		});
	}
}
