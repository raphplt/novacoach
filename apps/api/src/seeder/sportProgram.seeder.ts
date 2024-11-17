import { AppDataSource } from "../../ormconfig";
import { SportProgram } from "../entity/sportProgram";
import { Sport } from "../entity/sport";
import { Structure } from "../entity/structure";
import { faker } from "@faker-js/faker";

export const seedSportPrograms = async (count: number) => {
	const sportProgramRepository = AppDataSource.getRepository(SportProgram);
	const sportRepository = AppDataSource.getRepository(Sport);
	const structureRepository = AppDataSource.getRepository(Structure);

	const sports = await sportRepository.find();
	const structures = await structureRepository.find();

	for (let i = 0; i < count; i++) {
		const sportProgram = sportProgramRepository.create({
			name: faker.lorem.word(),
			difficulty: faker.helpers.arrayElement(["easy", "medium", "hard"]),
			duration: faker.number.int({ min: 30, max: 120 }),
			frequency: faker.number.int({ min: 1, max: 7 }),
			sport: faker.helpers.arrayElement(sports),
			structure: faker.helpers.arrayElement(structures),
		});
		await sportProgramRepository.save(sportProgram);
	}
};