import { AppDataSource } from "../../ormconfig";
import { Coach } from "../entity/coach";
import { User } from "../entity/user";
import { Structure } from "../entity/structure";

export interface CoachInput {
	description: string;
	structureId?: number | null;
	user: any;
}

export class CoachService {
	private coachRepository = AppDataSource.getRepository(Coach);
	private userRepository = AppDataSource.getRepository(User);
	private structureRepository = AppDataSource.getRepository(Structure);

	async getAllCoaches(): Promise<Coach[]> {
		return this.coachRepository.find({ relations: ["structure", "user"] });
	}

	async getCoachById(id: string): Promise<Coach | null> {
		const coach = await this.coachRepository.findOne({
			where: { id: parseInt(id) },
			relations: ["structure", "user"],
		});
		return coach || null;
	}

	async getCoachByUserId(id: string): Promise<Coach | null> {
		const parsedId = parseInt(id, 10);

		const user = await this.userRepository.findOneBy({ id: parsedId });

		if (!user) {
			return null;
		}

		const coach = await this.coachRepository.findOne({
			where: { user: { id: parsedId } },
			relations: ["user", "structure"],
		});

		return coach;
	}

	async getCoachesByStructureId(id: string): Promise<Coach[]> {
		const parsedId = parseInt(id, 10);

		const structure = await this.structureRepository.findOneBy({
			id: parsedId,
		});

		if (!structure) {
			console.log("Structure non trouvée");
			return [];
		}

		const coaches = await this.coachRepository.find({
			where: { structure: { id: parsedId } },
			relations: ["structure"],
		});

		return coaches;
	}

	async createCoach(coachData: CoachInput): Promise<Coach> {
		const newCoach = new Coach();
		newCoach.description = coachData.description;
		newCoach.user = coachData.user;

		if (coachData.structureId) {
			const structure = await this.structureRepository.findOneBy({
				id: coachData.structureId,
			});
			if (!structure) {
				console.log("Structure not found");
				throw new Error("Structure not found");
			}
			newCoach.structure = structure;
		}

		return this.coachRepository.save(newCoach);
	}

	async updateCoach(
		id: string,
		coach: Partial<Coach>,
	): Promise<Coach | null> {
		const parsedId = parseInt(id, 10);
		const coachToUpdate = await this.coachRepository.findOneBy({
			id: parsedId,
		});
		if (coachToUpdate) {
			Object.assign(coachToUpdate, coach);
			return this.coachRepository.save(coachToUpdate);
		}
		return null;
	}

	async deleteCoach(id: string): Promise<boolean> {
		const parsedId = parseInt(id, 10);
		const coachToDelete = await this.coachRepository.findOneBy({
			id: parsedId,
		});
		if (coachToDelete) {
			await this.coachRepository.remove(coachToDelete);
			return true;
		}
		return false;
	}
}