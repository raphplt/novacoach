import { AppDataSource } from "../../ormconfig";
import { NutritionProgram } from "../entity/nutritionProgram";
import { Structure } from "../entity/structure";

export class NutritionProgramServices {
	private nutritionProgramRepository = AppDataSource.getRepository(NutritionProgram);
	private structureRepository = AppDataSource.getRepository(Structure);

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

	async getNutritionProgramByStructureId(id: string): Promise<NutritionProgram[] | null> {
        const parsedId = parseInt(id, 10);
    
        const nutritionPrograms = await this.nutritionProgramRepository.find({
            where: { idStructure: parsedId },  
        });
    
        if (nutritionPrograms.length === 0) {
            console.log('Aucun programme de nutrition trouvé pour cette structure');
            return null;
        }
		console.log(nutritionPrograms)
        return nutritionPrograms;
    }

	async createNutritionProgram(
		nutritionProgram: Partial<NutritionProgram>,
	): Promise<NutritionProgram> {
		const newNutritionProgram =
			this.nutritionProgramRepository.create(nutritionProgram);
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
