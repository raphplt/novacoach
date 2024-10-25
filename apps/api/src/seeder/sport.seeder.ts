import { AppDataSource } from "../../ormconfig";
import { Sport } from "../entity/sport";
import { faker } from "@faker-js/faker";

export const seedSports = async (count: number) => {
	const sportRepository = AppDataSource.getRepository(Sport);

	for (let i = 0; i < count; i++) {
		const sport = sportRepository.create({
			name: faker.lorem.word(),
			description: faker.lorem.sentence(),
			icon: faker.image.url(),
		});
		await sportRepository.save(sport);
	}
};
