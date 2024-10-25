import { AppDataSource } from "../../ormconfig";
import { Exercice } from "../entity/exercice";
import { faker } from "@faker-js/faker";

export const seedExercices = async (count: number) => {
	const exerciceRepository = AppDataSource.getRepository(Exercice);

	for (let i = 0; i < count; i++) {
		const exercice = exerciceRepository.create({
			name: faker.lorem.word(),
			description: faker.lorem.sentence(),
			duration: faker.number.int({ min: 10, max: 60 }),
			reps: faker.number.int({ min: 5, max: 20 }),
			sets: faker.number.int({ min: 1, max: 5 }),
			breakTime: faker.number.int({ min: 30, max: 120 }),
			image: faker.lorem.slug(),
		});
		await exerciceRepository.save(exercice);
	}
};
