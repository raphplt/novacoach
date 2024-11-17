import { AppDataSource } from "../../ormconfig";
import { Bill } from "../entity/bill";
import { Structure } from "../entity/structure";
import { User } from "../entity/user";

export class BillService {
	private billRepository = AppDataSource.getRepository(Bill);
	private userRepository = AppDataSource.getRepository(User);
	private structureRepository = AppDataSource.getRepository(Structure);

	async getAllBills(): Promise<Bill[]> {
		return this.billRepository.find();
	}

	async getBillById(id: string): Promise<Bill | null> {
		const parsedId = parseInt(id, 10);
		return this.billRepository.findOneBy({
			idBill: parsedId,
		});
	}

	async getBillsByStructure(id: string): Promise<Bill[]> {
		const parsedId = parseInt(id, 10);
		return this.billRepository.find({
			where: {
				structure: { id: parsedId },
			},
			relations: ["user", "structure"],
		});
	}

	async createBill(
		bill: Partial<Bill>,
		idStructure: string,
		idUser: string,
	): Promise<Bill> {
		const parsedIdStructure = parseInt(idStructure, 10);
		const parsedIdUser = parseInt(idUser, 10);

		console.log(parsedIdStructure, parsedIdUser);

		const user = await this.userRepository.findOneBy({ id: parsedIdUser });
		const structure = await this.structureRepository.findOneBy({
			id: parsedIdStructure,
		});

		if (!user || !structure) {
			throw new Error("User or structure not found");
		}

		bill.user = user;
		bill.structure = structure;

		const newBill = this.billRepository.create(bill);
		return this.billRepository.save(newBill);
	}

	async updateBill(id: string, bill: Partial<Bill>): Promise<Bill | null> {
		const parsedId = parseInt(id, 10);
		const billToUpdate = await this.billRepository.findOneBy({
			idBill: parsedId,
		});
		if (billToUpdate) {
			Object.assign(billToUpdate, bill);
			return this.billRepository.save(billToUpdate);
		}
		return null;
	}

	async deleteBill(id: string): Promise<boolean> {
		const parsedId = parseInt(id, 10);
		const billToDelete = await this.billRepository.findOneBy({
			idBill: parsedId,
		});
		if (billToDelete) {
			await this.billRepository.remove(billToDelete);
			return true;
		}
		return false;
	}
}
