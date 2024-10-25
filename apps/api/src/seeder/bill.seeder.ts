import { AppDataSource } from "../../ormconfig";
import { Bill } from "../entity/bill";
import { UserDetails } from "../entity/userDetails";
import { faker } from "@faker-js/faker";

export const seedBills = async (count: number) => {
	const billRepository = AppDataSource.getRepository(Bill);
	const userDetailsRepository = AppDataSource.getRepository(UserDetails);

	const userDetails = await userDetailsRepository.find();

	if (userDetails.length === 0) {
		console.error("No user details found. Please seed user details first.");
		return;
	}

	for (let i = 0; i < count; i++) {
		const bill = billRepository.create({
			amount: faker.number.int({ min: 100, max: 1000 }),
			dateIssued: faker.date.past(),
			dateDue: faker.date.future(),
			status: faker.helpers.arrayElement(["paid", "unpaid", "pending"]),
			userDetails: faker.helpers.arrayElement(userDetails),
		});
		await billRepository.save(bill);
	}
};
