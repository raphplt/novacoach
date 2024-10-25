import { Request, Response } from "express";
import { StructureService } from "../services/structure.service";

export class StructureController {
	private structureService = new StructureService();

	async getAllStructures(req: Request, res: Response): Promise<void> {
		try {
			const structures = await this.structureService.getAllStructures();
			res.status(200).json(structures);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getStructureById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const structure = await this.structureService.getStructureById(id);
			if (structure) {
				res.status(200).json(structure);
			} else {
				res.status(404).json({ message: "Structure not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async createStructure(req: Request, res: Response): Promise<void> {
		try {
			const { coachId, ...structureData } = req.body;
			const structure = await this.structureService.createStructure(
				structureData,
				coachId,
			);
			res.status(201).json(structure);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async updateStructure(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const structure = await this.structureService.updateStructure(
				id,
				req.body,
			);
			if (structure) {
				res.status(200).json(structure);
			} else {
				res.status(404).json({ message: "Structure not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async deleteStructure(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const isDeleted = await this.structureService.deleteStructure(id);
			if (isDeleted) {
				res.status(200).json({ message: "Structure deleted" });
			} else {
				res.status(404).json({ message: "Structure not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}