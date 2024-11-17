import { AppDataSource } from "../../ormconfig";
import { NutritionProgram } from "../entity/nutritionProgram";
import { Structure } from "../entity/structure";
import { faker } from "@faker-js/faker";

export const seedNutritionPrograms = async (count: number) => {
  const nutritionProgramRepository = AppDataSource.getRepository(NutritionProgram);
  const structureRepository = AppDataSource.getRepository(Structure);
  for (let i = 0; i < count; i++) {
    const structure = await structureRepository.findOne({
      where: { id: faker.number.int({ min: 1, max: 10 }) },
    });

    if (structure) {
      const nutritionProgram = nutritionProgramRepository.create({
        name: faker.lorem.word(),
        duration: faker.number.int({ min: 1, max: 12 }),
        frequency: faker.number.int({ min: 1, max: 7 }),
        structure,
      });
      await nutritionProgramRepository.save(nutritionProgram);
    }
  }
};