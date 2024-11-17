import { Request, Response } from 'express';
import { ExerciceServices } from '../services/exercice.service';

export class ExerciceController {
    private exerciceService = new ExerciceServices();

    async getAllExercice(req: Request, res: Response): Promise<void> {
        try {
            const exercice = await this.exerciceService.getAllExercice();
            res.status(200).json(exercice);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getExerciceById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const exercice = await this.exerciceService.getExerciceById(id);
            if (exercice) {
                res.status(200).json(exercice);
            } else {
                res.status(404).json({ message: 'Exercice not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
	}

	async getExerciceByStructureId(req: Request, res: Response): Promise<void> {
		try {
			const { structureId } = req.params;
			const exercice = await this.exerciceService.getExerciceByStructureId(structureId);
			if (exercice) {
				res.status(200).json(exercice);
			}
		}
		catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}


    async getExerciceBySportProgramId(req: Request, res: Response): Promise<void> {
        try {
            const { sportProgramId } = req.params;
            const exercice = await this.exerciceService.getExerciceBySportProgramId(sportProgramId);
            if (exercice) {
                res.status(200).json(exercice);
            } else {
                res.status(404).json({ message: 'Exercice not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async createExercice(req: Request, res: Response): Promise<void> {
		try {
			const { idStructure, ...rest } = req.body;
			console.log("idStructure", idStructure, "rest", rest);

			const exercice = await this.exerciceService.createExercice({
				...rest,
				idStructure,
			});
			res.status(201).json(exercice);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
    }

    async updateExercice(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const exercice = await this.exerciceService.updateExercice(id, req.body);
            if (exercice) {
                res.status(200).json(exercice);
            } else {
                res.status(404).json({ message: 'Exercice not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteExercice(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const isDeleted = await this.exerciceService.deleteExercice(id);
            if (isDeleted) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: 'Exercice not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
