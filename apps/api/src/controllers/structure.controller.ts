import { Request, Response } from "express";
import { StructureService } from "../services/structure.service";
import { FileUploadService } from "../services/fileUpload.service";

export class StructureController {
	private structureService = new StructureService();
	private fileUploadService = new FileUploadService();

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
			let logoUrl = null;

			// Si un fichier est attaché, uploader le logo sur Cloudinary
			if (req.file) {
				logoUrl = await this.fileUploadService.uploadFile(
					req.file.path,
					"image",
				);
			}

			// Ajouter l'URL du logo aux données de la structure
			const structureWithLogo = { ...structureData, logo: logoUrl };
			const structure = await this.structureService.createStructure(
				structureWithLogo,
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
