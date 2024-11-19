import { Request, Response } from "express";
import { BillService } from "../services/bill.service";

export class BillController {
	private billService = new BillService();

	async getAllBills(req: Request, res: Response): Promise<void> {
		try {
			const bills = await this.billService.getAllBills();
			res.status(200).json(bills);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getBillById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const bill = await this.billService.getBillById(id);
			if (bill) {
				res.status(200).json(bill);
			} else {
				res.status(404).json({ message: "Bill not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getBillsByStructure(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const bill = await this.billService.getBillsByStructure(id);
			if (bill) {
				res.status(200).json(bill);
			} else {
				res.status(404).json({ message: "Bill not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getBillsByUser(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const bill = await this.billService.getBillsByUser(id);
			if (bill) {
				res.status(200).json(bill);
			} else {
				res.status(404).json({ message: "Bill not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async payBill(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const bill = await this.billService.payBill(id);
			if (bill) {
				res.status(200).json(bill);
			} else {
				res.status(404).json({ message: "Bill not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async createBill(req: Request, res: Response): Promise<void> {
		try {
			const { userId, structureId, ...billData } = req.body;
			const bill = await this.billService.createBill(
				req.body,
				structureId,
				userId,
			);
			res.status(201).json(bill);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async updateBill(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const bill = await this.billService.updateBill(id, req.body);
			if (bill) {
				res.status(200).json(bill);
			} else {
				res.status(404).json({ message: "Bill not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async deleteBill(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const isDeleted = await this.billService.deleteBill(id);
			if (isDeleted) {
				res.status(204).end();
			} else {
				res.status(404).json({ message: "Bill not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}
