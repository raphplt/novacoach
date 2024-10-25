import { AppDataSource } from "../../ormconfig";
import { Message } from "../entity/message";
import { faker } from "@faker-js/faker";

export const seedMessages = async (count: number) => {
	const messageRepository = AppDataSource.getRepository(Message);

	for (let i = 0; i < count; i++) {
		const message = messageRepository.create({
			content: faker.lorem.sentence(),
			sendDate: faker.date.recent(),
		});
		await messageRepository.save(message);
	}
};
