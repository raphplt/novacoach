import { Request, Response } from "express";
import { GoalService } from "../services/goal.service";

export class GoalController {
    private goalService = new GoalService();

    async getAllGoals(req: Request, res: Response): Promise<void> {
        try {
            const goals = await this.goalService.getAllGoals();
            res.status(200).json(goals);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async createGoal(req: Request, res: Response): Promise<void> {
        try {
            const goal = await this.goalService.createGoal(req.body);
            res.status(201).json(goal);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateGoal(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const goal = await this.goalService.updateGoal(id, req.body);
            if (goal) {
                res.status(200).json(goal);
            } else {
                res.status(404).json({ message: "Goal not found" });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteGoal(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const isDeleted = await this.goalService.deleteGoal(id);
            if (isDeleted) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: "Goal not found" });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
