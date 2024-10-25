import { UserHasNutritionProgramService } from "../services/userHasNutritionProgram.service";
import { Request, Response } from "express";

export class UserHasNutritionProgramController {
  private userHasNutritionProgramService = new UserHasNutritionProgramService();

  async getAllUserNutritionPrograms(req: Request, res: Response): Promise<void> {
    try {
      const programs = await this.userHasNutritionProgramService.getAllUserNutritionPrograms();
      res.status(200).json(programs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserNutritionProgramById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const program = await this.userHasNutritionProgramService.getUserNutritionProgramById(id);
      if (program) {
        res.status(200).json(program);
      } else {
        res.status(404).json({ message: "Nutrition program not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createUserNutritionProgram(req: Request, res: Response): Promise<void> {
    try {
      const program = await this.userHasNutritionProgramService.createUserNutritionProgram(req.body);
      res.status(201).json(program);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUserNutritionProgram(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const program = await this.userHasNutritionProgramService.updateUserNutritionProgram(id, req.body);
      if (program) {
        res.status(200).json(program);
      } else {
        res.status(404).json({ message: "Nutrition program not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUserNutritionProgram(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const isDeleted = await this.userHasNutritionProgramService.deleteUserNutritionProgram(id);
      if (isDeleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Nutrition program not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}