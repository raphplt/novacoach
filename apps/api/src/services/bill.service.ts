import { AppDataSource } from "../../ormconfig";
import { Bill } from "../entity/bill";

export class BillService {
    private billRepository = AppDataSource.getRepository(Bill);

    async getAllBills(): Promise<Bill[]> {
        return this.billRepository.find();
    }

    async getBillById(id: string): Promise<Bill | null> {
        const parsedId = parseInt(id, 10);
        return this.billRepository.findOneBy({
            idBill: parsedId,
        });
    }

    async createBill(bill: Partial<Bill>): Promise<Bill> {
        const newBill = this.billRepository.create(bill);
        return this.billRepository.save(newBill);
    }

    async updateBill(id: string, bill: Partial<Bill>): Promise<Bill | null> {
        const parsedId = parseInt(id, 10);
        const billToUpdate = await this.billRepository.findOneBy({ idBill: parsedId });
        if (billToUpdate) {
            Object.assign(billToUpdate, bill);
            return this.billRepository.save(billToUpdate);
        }
        return null;
    }

    async deleteBill(id: string): Promise<boolean> {
        const parsedId = parseInt(id, 10);
        const billToDelete = await this.billRepository.findOneBy({ idBill: parsedId });
        if (billToDelete) {
            await this.billRepository.remove(billToDelete);
            return true;
        }
        return false;
    }
}
