import { AppDataSource } from "../../ormconfig";
import { Exercice } from "../entity/exercice";
import { SportProgramHasExercice } from "../entity/sportProgramHasExercice";

export class ExerciceServices {
	private exerciceRepository = AppDataSource.getRepository(Exercice);
	private SportProgramHasExerciceRepository = AppDataSource.getRepository(
		SportProgramHasExercice,
	);

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

	async updateExercice(
		id: string,
		exercice: Partial<Exercice>,
	): Promise<Exercice | null> {
		const parsedId = parseInt(id, 10);
		const exerciceToUpdate = await this.exerciceRepository.findOneBy({
			id: parsedId,
		});
		if (exerciceToUpdate) {
			Object.assign(exerciceToUpdate, exercice);
			return this.exerciceRepository.save(exerciceToUpdate);
		}
		return null;
	}

	async getExerciceBySportProgramId(
		sportProgramId: string,
	): Promise<Exercice[]> {
		try {
			const parseId = parseInt(sportProgramId, 10);

			const exercises = await this.SportProgramHasExerciceRepository.find(
				{
					where: { sportProgram: { id: parseId } },
					relations: ["exercice"],
				},
			);

			if (exercises.length === 0) {
				console.log(
					`No exercises found for sport program ID: ${parseId}`,
				);
				return [];
			}

			const mappedExercises = exercises.map((ex) => ex.exercice);
			return mappedExercises;
		} catch (error) {
			console.error("Error fetching exercises:", error);
			throw new Error(
				`Failed to fetch exercises for sport program ID: ${sportProgramId}`,
			);
		}
	}

	async deleteExercice(id: string): Promise<boolean> {
		const parsedId = parseInt(id, 10);
		const exerciceToDelete = await this.exerciceRepository.findOneBy({
			id: parsedId,
		});
		if (exerciceToDelete) {
			await this.exerciceRepository.remove(exerciceToDelete);
			return true;
		}
		return false;
	}
}
