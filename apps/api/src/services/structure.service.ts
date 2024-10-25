import { AppDataSource } from "../../ormconfig";
import { Structure } from "../entity/structure";
import { Coach } from "../entity/coach";
import { User } from "../entity/user";

export class StructureService {
	private structureRepository = AppDataSource.getRepository(Structure);
	private coachRepository = AppDataSource.getRepository(Coach);

	async getAllStructures(): Promise<Structure[]> {
		return this.structureRepository.find();
	}

	async getStructureById(id: string): Promise<Structure | null> {
		const parsedId = parseInt(id, 10);
		return this.structureRepository.findOneBy({
			id: parsedId,
		});
	}

	async createStructure(
		structure: Partial<Structure>,
		coachId: number,
	): Promise<Structure> {
		const newStructure = this.structureRepository.create(structure);
		const savedStructure =
			await this.structureRepository.save(newStructure);

		const coach = await this.coachRepository.findOneBy({ id: coachId });
		if (coach) {
			coach.structure = savedStructure;
			await this.coachRepository.save(coach);
		}

		return savedStructure;
	}

	async updateStructure(
		id: string,
		structure: Partial<Structure>,
	): Promise<Structure | null> {
		const parsedId = parseInt(id, 10);
		const structureToUpdate = await this.structureRepository.findOneBy({
			id: parsedId,
		});
		if (structureToUpdate) {
			Object.assign(structureToUpdate, structure);
			return this.structureRepository.save(structureToUpdate);
		}
		return null;
	}

	async deleteStructure(id: string): Promise<boolean> {
		const parsedId = parseInt(id, 10);
		const structureToDelete = await this.structureRepository.findOneBy({
			id: parsedId,
		});
		if (structureToDelete) {
			await this.structureRepository.remove(structureToDelete);
			return true;
		}
		return false;
	}
}