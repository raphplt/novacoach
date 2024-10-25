import { AppDataSource } from "../../ormconfig";
import { SportProgram } from "../entity/sportProgram";

export class SportProgramServices {
	private sportProgramRepository = AppDataSource.getRepository(SportProgram);

	async getAllSportProgram(): Promise<SportProgram[]> {
		return this.sportProgramRepository.find(); 
	}

	async getSportProgramById(id: string): Promise<SportProgram | null> {
		const parsedId = parseInt(id, 10);
		return this.sportProgramRepository.findOneBy({
			id: parsedId,
		});
	}

	async getSportProgramByStructureId(id: string): Promise<SportProgram[]| null> {
		const parsedId = parseInt(id, 10);
		const sportProgram = await this.sportProgramRepository.find({
            where: { idStructure: parsedId },  
			relations: ['sport']
        });

		console.log(sportProgram)
		return sportProgram;
	}

	async createSportProgram(sportProgram: Partial<SportProgram>): Promise<SportProgram> {
		const newSportProgram = this.sportProgramRepository.create(sportProgram);
		return this.sportProgramRepository.save(newSportProgram);
	}

	async updateSportProgram(id: string, sportProgram: Partial<SportProgram>): Promise<SportProgram | null> {
		const parsedId = parseInt(id, 10);
		const sportProgramToUpdate = await this.sportProgramRepository.findOneBy({ id: parsedId });
		if (sportProgramToUpdate) {
			Object.assign(sportProgramToUpdate, sportProgram);
			return this.sportProgramRepository.save(sportProgramToUpdate);
		}
		return null;
	}

	async deleteSportProgram(id: string): Promise<boolean> {
		const parsedId = parseInt(id, 10);
		const sportProgramToDelete = await this.sportProgramRepository.findOneBy({ id: parsedId });
		if (sportProgramToDelete) {
			await this.sportProgramRepository.remove(sportProgramToDelete);
			return true;
		}
		return false;
	}
}
