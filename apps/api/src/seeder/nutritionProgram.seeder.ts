import { AppDataSource } from "../../ormconfig";
import { NutritionProgram } from "../entity/nutritionProgram";
import { faker } from "@faker-js/faker";

export const seedNutritionPrograms = async (count: number) => {
	const nutritionProgramRepository =
		AppDataSource.getRepository(NutritionProgram);

	for (let i = 0; i < count; i++) {
		const nutritionProgram = nutritionProgramRepository.create({
			name: faker.lorem.word(),
			duration: faker.number.int({ min: 1, max: 12 }),
			frequency: faker.number.int({ min: 1, max: 7 }),
			idStructure: faker.number.int({ min: 1, max: 10 }),
		});
		await nutritionProgramRepository.save(nutritionProgram);
	}
};
