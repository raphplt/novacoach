import { AppDataSource } from "../../ormconfig";
import { Exercice } from "../entity/exercice";

export class ExerciceServices {
	private exerciceRepository = AppDataSource.getRepository(Exercice);

	async getAllExercice(): Promise<Exercice[]> {
		return this.exerciceRepository.find(); 
	}

	async getExerciceById(id: string): Promise<Exercice | null> {
		const parsedId = parseInt(id, 10);
		return this.exerciceRepository.findOneBy({
			id: parsedId,
		});
	}

	async createExercice(exercice: Partial<Exercice>): Promise<Exercice> {
		const newExercice = this.exerciceRepository.create(exercice);
		return this.exerciceRepository.save(newExercice);
	}

	async updateExercice(id: string, exercice: Partial<Exercice>): Promise<Exercice | null> {
		const parsedId = parseInt(id, 10);
		const exerciceToUpdate = await this.exerciceRepository.findOneBy({ id: parsedId });
		if (exerciceToUpdate) {
			Object.assign(exerciceToUpdate, exercice);
			return this.exerciceRepository.save(exerciceToUpdate);
		}
		return null;
	}

	async deleteExercice(id: string): Promise<boolean> {
		const parsedId = parseInt(id, 10);
		const exerciceToDelete = await this.exerciceRepository.findOneBy({ id: parsedId });
		if (exerciceToDelete) {
			await this.exerciceRepository.remove(exerciceToDelete);
			return true;
		}
		return false;
	}
}
