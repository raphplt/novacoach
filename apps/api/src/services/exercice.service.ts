import { AppDataSource } from "../../ormconfig";
import { Exercice } from "../entity/exercice";
import { SportProgramHasExercice } from "../entity/sportProgramHasExercice";
import { Structure } from "../entity/structure";

export class ExerciceServices {
	private exerciceRepository = AppDataSource.getRepository(Exercice);
	private SportProgramHasExerciceRepository = AppDataSource.getRepository(
		SportProgramHasExercice,
	);
	private structureRepository = AppDataSource.getRepository(Structure);

	async getAllExercice(): Promise<Exercice[]> {
		return this.exerciceRepository.find();
	}

	async getExerciceById(id: string): Promise<Exercice | null> {
		const parsedId = parseInt(id, 10);
		return this.exerciceRepository.findOneBy({
			id: parsedId,
		});
	}

	async getExerciceByStructureId(structureId: string): Promise<Exercice[]> {
		try {
			const parseId = parseInt(structureId, 10);

			const exercises = await this.exerciceRepository.find({
				where: { structure: { id: parseId } },
			});

			if (exercises.length === 0) {
				console.log(`No exercises found for structure ID: ${parseId}`);
				return [];
			}

			return exercises;
		} catch (error) {
			console.error("Error fetching exercises:", error);
			throw new Error(
				`Failed to fetch exercises for structure ID: ${structureId}`,
			);
		}
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

	async createExercice({ ...exercice }): Promise<Exercice> {
		try {
			const { idStructure, ...rest } = exercice;

			const structure = await this.structureRepository.findOneBy({
				id: idStructure,
			});

			if (!structure) {
				throw new Error("Structure not found");
			}

			const newExercice = this.exerciceRepository.create({
				...rest,
				structure,
			});

			return this.exerciceRepository.save(newExercice);
		} catch (error) {
			console.error("Error creating exercise:", error);
			throw new Error("Failed to create exercise");
		}
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
