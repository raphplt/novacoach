import { Request, Response } from "express";
import { LicenceService } from "../services/licence.service";

export class LicenceController {
    private licenceService = new LicenceService();

    async getAllLicences(req: Request, res: Response): Promise<void> {
        try {
            const licences = await this.licenceService.getAllLicences();
            res.status(200).json(licences);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async createLicence(req: Request, res: Response): Promise<void> {
        try {
            const licence = await this.licenceService.createLicence(req.body);
            res.status(201).json(licence);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateLicence(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const licence = await this.licenceService.updateLicence(id, req.body);
            if (licence) {
                res.status(200).json(licence);
            } else {
                res.status(404).json({ message: "Licence not found" });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteLicence(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const isDeleted = await this.licenceService.deleteLicence(id);
            if (isDeleted) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: "Licence not found" });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getLicenceById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const licence = await this.licenceService.getLicenceById(id);
            if (licence) {
                res.status(200).json(licence);
            } else {
                res.status(404).json({ message: "Licence not found" });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
