import { AppDataSource } from "../../ormconfig";
import { Sport } from "../entity/sport";

export class SportService {
	private sportRepository = AppDataSource.getRepository(Sport);

	async getAllSports(): Promise<Sport[]> {
		return this.sportRepository.find(); 
	}

	async getSportById(id: string): Promise<Sport | null> {
		const parsedId = parseInt(id, 10);
		return this.sportRepository.findOneBy({
			id: parsedId,
		});
	}

	async createSport(sport: Partial<Sport>): Promise<Sport> {
		const newSport = this.sportRepository.create(sport);
		return this.sportRepository.save(newSport);
	}

	async updateSport(id: string, sport: Partial<Sport>): Promise<Sport | null> {
		const parsedId = parseInt(id, 10);
		const sportToUpdate = await this.sportRepository.findOneBy({ id: parsedId });
		if (sportToUpdate) {
			Object.assign(sportToUpdate, sport);
			return this.sportRepository.save(sportToUpdate);
		}
		return null;
	}

	async deleteSport(id: string): Promise<boolean> {
		const parsedId = parseInt(id, 10);
		const sportToDelete = await this.sportRepository.findOneBy({ id: parsedId });
		if (sportToDelete) {
			await this.sportRepository.remove(sportToDelete);
			return true;
		}
		return false;
	}
}
