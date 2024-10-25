import { UserHasMessageService } from "../services/userHasMessages.service";
import { Request, Response } from "express";

export class UserHasMessageController {
  private userHasMessageService = new UserHasMessageService();

  async getAllUserMessages(req: Request, res: Response): Promise<void> {
    try {
      const userMessages = await this.userHasMessageService.getAllUserMessages();
      res.status(200).json(userMessages);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserMessageById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userMessage = await this.userHasMessageService.getUserMessageById(id);
      if (userMessage) {
        res.status(200).json(userMessage);
      } else {
        res.status(404).json({ message: "User message not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async createUserMessage(req: Request, res: Response): Promise<void> {
    try {
      const userMessage = await this.userHasMessageService.createUserMessage(req.body);
      res.status(201).json(userMessage);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUserMessage(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userMessage = await this.userHasMessageService.updateUserMessage(id, req.body);
      if (userMessage) {
        res.status(200).json(userMessage);
      } else {
        res.status(404).json({ message: "User message not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUserMessage(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const isDeleted = await this.userHasMessageService.deleteUserMessage(id);
      if (isDeleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "User message not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}