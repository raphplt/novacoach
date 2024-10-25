import { Request, Response } from 'express';
import { SportService } from '../services/sport.service';

export class SportController {
    private sportService = new SportService();

    async getAllSport(req: Request, res: Response): Promise<void> {
        try {
            const sport = await this.sportService.getAllSports();
            res.status(200).json(sport);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getSportById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const sport = await this.sportService.getSportById(id);
            if (sport) {
                res.status(200).json(sport);
            } else {
                res.status(404).json({ message: 'Sport not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async createSport(req: Request, res: Response): Promise<void> {
        try {
            const sport = await this.sportService.createSport(req.body);
            res.status(201).json(sport);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateSport(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const sport = await this.sportService.updateSport(id, req.body);
            if (sport) {
                res.status(200).json(sport);
            } else {
                res.status(404).json({ message: 'Sport not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteSport(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const isDeleted = await this.sportService.deleteSport(id);
            if (isDeleted) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: 'Sport not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
