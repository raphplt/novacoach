import { AppDataSource } from "../../ormconfig";
import { Meal } from '../entity/meal';
import { NutritionProgram } from '../entity/nutritionProgram';
import { NutritionProgramMeal } from '../entity/nutritionProgramMeal';
import { Structure } from '../entity/structure';

export class NutritionProgramServices {
	private nutritionProgramRepository =
		AppDataSource.getRepository(NutritionProgram);
	private mealRepository = AppDataSource.getRepository(Meal);
	private structureRepository = AppDataSource.getRepository(Structure);
	private nutritionProgramHasMealRepository =
		AppDataSource.getRepository(NutritionProgramMeal);

	async getAllNutritionProgram(): Promise<NutritionProgram[]> {
		return this.nutritionProgramRepository.find();
	}

	async getNutritionProgramById(
		id: string,
	): Promise<NutritionProgram | null> {
		const parsedId = parseInt(id, 10);
		return this.nutritionProgramRepository.findOneBy({
			id: parsedId,
		});
	}

	async getNutritionProgramByStructureId(
		id: string,
	): Promise<NutritionProgram[] | null> {
		const parsedId = parseInt(id, 10);

		const nutritionPrograms = await this.nutritionProgramRepository.find({
			where: { structure: { id: parsedId } },
		});

        if (nutritionPrograms.length === 0) {
			console.log(
				"Aucun programme de nutrition trouvé pour cette structure",
			);
			return null;
		}
        return nutritionPrograms;
    }

	async gerNutritionProgramMeal(id: string) {
		const parsedId = parseInt(id, 10);
		const nutritionProgram = await this.nutritionProgramRepository.findOne({
			where: { id: parsedId },
			relations: ['nutritionProgramsMeal.meal'],
		});

		return nutritionProgram;
	}

	async deleteMealFromProgram(
		programId: string,
		exerciseId: string,
	): Promise<boolean> {
		const parsedProgramId = parseInt(programId, 10);
		const parsedMealId = parseInt(exerciseId, 10);

		const nutritionProgram =
			await this.nutritionProgramRepository.findOneBy({
				id: parsedProgramId,
			});
		const meal = await this.mealRepository.findOneBy({
			id: parsedMealId,
		});

		if (!nutritionProgram || !meal) {
			throw new Error('NutritionProgram or Meal not found');
		}

		const nutritionProgramHasExercice =
			await this.nutritionProgramHasMealRepository.findOneBy({
				nutritionProgram,
				meal: meal,
			});

		if (nutritionProgramHasExercice) {
			await this.nutritionProgramHasMealRepository.remove(
				nutritionProgramHasExercice,
			);
			return true;
		}
		return false;
	}

	async addMealToProgram(
		programId: string,
		mealId: string,
	): Promise<NutritionProgramMeal> {
		const parsedProgramId = parseInt(programId, 10);
		const parsedMealId = parseInt(mealId, 10);

		const nutritionProgram =
			await this.nutritionProgramRepository.findOneBy({
				id: parsedProgramId,
			});

		console.log('NutritionProgram', nutritionProgram);
		const meal = await this.mealRepository.findOneBy({
			id: parsedMealId,
		});

		if (!nutritionProgram || !meal) {
			throw new Error('NutritionProgram or Meal not found');
		}

		const nutritionProgramHasMeal =
			this.nutritionProgramHasMealRepository.create({
				nutritionProgram,
				meal: meal,
			});

		console.log('NutritionProgramHasMeal', nutritionProgramHasMeal);

		return this.nutritionProgramHasMealRepository.save(
			nutritionProgramHasMeal,
		);
	}

	async createNutritionProgram({ ...nutritionProgram }): Promise<NutritionProgram> {
		const { idStructure, ...rest } = nutritionProgram;

		const structure = await this.structureRepository.findOneBy({
			id: idStructure,
		});

		if (!structure) {
			throw new Error('Structure not found');
		}

		const newNutritionProgram = this.nutritionProgramRepository.create({
			...rest,
			structure,
		});

		return this.nutritionProgramRepository.save(newNutritionProgram);
	}

	async updateNutritionProgram(
		id: string,
		nutritionProgram: Partial<NutritionProgram>,
	): Promise<NutritionProgram | null> {
		const parsedId = parseInt(id, 10);
		const nutritionProgramToUpdate =
			await this.nutritionProgramRepository.findOneBy({
				id: parsedId,
			});
		if (nutritionProgramToUpdate) {
			Object.assign(nutritionProgramToUpdate, nutritionProgram);
			return this.nutritionProgramRepository.save(
				nutritionProgramToUpdate,
			);
		}
		return null;
	}

	async deleteNutritionProgram(id: string): Promise<boolean> {
		const parsedId = parseInt(id, 10);
		const nutritionProgramToDelete =
			await this.nutritionProgramRepository.findOneBy({
				id: parsedId,
			});
		if (nutritionProgramToDelete) {
			await this.nutritionProgramRepository.remove(
				nutritionProgramToDelete,
			);
			return true;
		}
		return false;
	}
}
