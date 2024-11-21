import { AppDataSource } from "../../ormconfig";
import { Exercice } from "../entity/exercice";
import { SportProgram } from "../entity/sportProgram";
import { SportProgramHasExercice } from "../entity/sportProgramHasExercice";
import { Structure } from "../entity/structure";

export class SportProgramServices {
	private sportProgramRepository = AppDataSource.getRepository(SportProgram);
	private structureRepository = AppDataSource.getRepository(Structure);
	private sportProgramHasExerciceRepository = AppDataSource.getRepository(
		SportProgramHasExercice,
	);
	private exerciceRepository = AppDataSource.getRepository(Exercice);

	async getAllSportProgram(): Promise<SportProgram[]> {
		return this.sportProgramRepository.find();
	}

	async getSportProgramById(id: string): Promise<SportProgram | null> {
		const parsedId = parseInt(id, 10);
		return this.sportProgramRepository.findOne({
			where: { id: parsedId },
			relations: [
				"sport",
				"sportProgramHasExercices",
				"sportProgramHasExercices.exercice",
			],
		});
	}

	async gerSportProgramExercices(id: string) {
		const parsedId = parseInt(id, 10);

		const sportProgram = await this.sportProgramRepository.findOne({
			where: { id: parsedId },
			relations: [
				"sportProgramHasExercices",
				"sportProgramHasExercices.exercice",
			],
		});

		return sportProgram;
	}

	async addExerciseToProgram(
		programId: string,
		exerciseId: string,
	): Promise<SportProgramHasExercice> {
		const parsedProgramId = parseInt(programId, 10);
		const parsedExerciseId = parseInt(exerciseId, 10);

		const sportProgram = await this.sportProgramRepository.findOneBy({
			id: parsedProgramId,
		});
		const exercise = await this.exerciceRepository.findOneBy({
			id: parsedExerciseId,
		});

		if (!sportProgram || !exercise) {
			throw new Error("SportProgram or Exercise not found");
		}

		const sportProgramHasExercice =
			this.sportProgramHasExerciceRepository.create({
				sportProgram,
				exercice: exercise,
			});

		return this.sportProgramHasExerciceRepository.save(
			sportProgramHasExercice,
		);
	}

	async deleteExerciseFromProgram(
		programId: string,
		exerciseId: string,
	): Promise<boolean> {
		const parsedProgramId = parseInt(programId, 10);
		const parsedExerciseId = parseInt(exerciseId, 10);

		const sportProgram = await this.sportProgramRepository.findOneBy({
			id: parsedProgramId,
		});
		const exercise = await this.exerciceRepository.findOneBy({
			id: parsedExerciseId,
		});

		if (!sportProgram || !exercise) {
			throw new Error("SportProgram or Exercise not found");
		}

		const sportProgramHasExercice =
			await this.sportProgramHasExerciceRepository.findOneBy({
				sportProgram,
				exercice: exercise,
			});
		if (sportProgramHasExercice) {
			await this.sportProgramHasExerciceRepository.remove(
				sportProgramHasExercice,
			);
			return true;
		}
		return false;
	}

	async getSportProgramByStructureId(
		id: string,
	): Promise<SportProgram[] | null> {
		const parsedId = parseInt(id, 10);
		const sportProgram = await this.sportProgramRepository.find({
			where: { structure: { id: parsedId } },
			relations: [
				"sport",
				"sportProgramHasExercices",
				"sportProgramHasExercices.exercice",
			],
		});

		return sportProgram;
	}

	async createSportProgram({ ...sportProgram }): Promise<SportProgram> {
		const { idStructure, ...rest } = sportProgram;

		const structure = await this.structureRepository.findOneBy({
			id: idStructure,
		});

		if (!structure) {
			throw new Error("Structure not found");
		}

		const newSportProgram = this.sportProgramRepository.create({
			...rest,
			structure,
		});

		return this.sportProgramRepository.save(newSportProgram);
	}

	async updateSportProgram(
		id: string,
		sportProgram: Partial<SportProgram>,
	): Promise<SportProgram | null> {
		const parsedId = parseInt(id, 10);
		const sportProgramToUpdate =
			await this.sportProgramRepository.findOneBy({ id: parsedId });
		if (sportProgramToUpdate) {
			Object.assign(sportProgramToUpdate, sportProgram);
			return this.sportProgramRepository.save(sportProgramToUpdate);
		}
		return null;
	}

	async deleteSportProgram(id: string): Promise<boolean> {
		const parsedId = parseInt(id, 10);
		const sportProgramToDelete =
			await this.sportProgramRepository.findOneBy({ id: parsedId });
		if (sportProgramToDelete) {
			await this.sportProgramRepository.remove(sportProgramToDelete);
			return true;
		}
		return false;
	}
}
