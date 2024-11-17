import { AppDataSource } from "../../ormconfig";
import { Bill } from "../entity/bill";
import { UserDetails } from "../entity/userDetails";
import { faker } from "@faker-js/faker";

export const seedBills = async (count: number) => {
	const billRepository = AppDataSource.getRepository(Bill);
	const userDetailsRepository = AppDataSource.getRepository(UserDetails);

	const user = await userDetailsRepository.find();

	if (user.length === 0) {
		console.error("No user details found. Please seed user details first.");
		return;
	}

	for (let i = 0; i < count; i++) {
		const bill = billRepository.create({
			amount: faker.number.int({ min: 100, max: 1000 }),
			dateIssued: faker.date.past(),
			dateDue: faker.date.future(),
			status: faker.helpers.arrayElement(["paid", "unpaid", "pending"]),
			user: faker.helpers.arrayElement(user),
		});
		await billRepository.save(bill);
	}
};
