import { AppDataSource } from "../../ormconfig";
import { Goal } from "../entity/goal";

export class GoalService {
    private goalRepository = AppDataSource.getRepository(Goal);

    async getAllGoals(): Promise<Goal[]> {
        return this.goalRepository.find({ relations: ["idUserDetails"] });
    }

    async createGoal(goal: Partial<Goal>): Promise<Goal> {
        const newGoal = this.goalRepository.create(goal);
        return this.goalRepository.save(newGoal);
    }

    async updateGoal(id: string, goal: Partial<Goal>): Promise<Goal | null> {
        const goalToUpdate = await this.goalRepository.findOneBy({ id: parseInt(id, 10) });
        if (goalToUpdate) {
            Object.assign(goalToUpdate, goal);
            return this.goalRepository.save(goalToUpdate);
        }
        return null;
    }

    async deleteGoal(id: string): Promise<boolean> {
        const goalToDelete = await this.goalRepository.findOneBy({ id: parseInt(id, 10) });
        if (goalToDelete) {
            await this.goalRepository.remove(goalToDelete);
            return true;
        }
        return false;
    }
}
