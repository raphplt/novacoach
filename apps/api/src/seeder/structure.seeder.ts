import { AppDataSource } from "../../ormconfig";
import { Structure } from "../entity/structure";
import { faker } from "@faker-js/faker";

export const seedStructures = async (count: number) => {
	const structureRepository = AppDataSource.getRepository(Structure);

	for (let i = 0; i < count; i++) {
		const structure = structureRepository.create({
			name: faker.company.name(),
			description: faker.lorem.sentence(),
			address: faker.location.streetAddress(),
			phone: faker.phone.number(),
			logo: faker.image.url(),
		});
		await structureRepository.save(structure);
	}
};
