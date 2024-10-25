import { AppDataSource } from "../../ormconfig";
import { UserHasNutritionProgram } from "../entity/userHasNutritionProgram";

export class UserHasNutritionProgramService {
  private userHasNutritionProgramRepository = AppDataSource.getRepository(UserHasNutritionProgram);

  async getAllUserNutritionPrograms(): Promise<UserHasNutritionProgram[]> {
    return this.userHasNutritionProgramRepository.find({ relations: ["user", "nutritionProgram", "coach"] });
  }

  async getUserNutritionProgramById(id: string): Promise<UserHasNutritionProgram | null> {
    const parsedId = parseInt(id, 10);
    return this.userHasNutritionProgramRepository.findOne({
      where: { id: parsedId },
      relations: ["user", "nutritionProgram", "coach"],
    });
  }

  async createUserNutritionProgram(program: Partial<UserHasNutritionProgram>): Promise<UserHasNutritionProgram> {
    const newProgram = this.userHasNutritionProgramRepository.create(program);
    return this.userHasNutritionProgramRepository.save(newProgram);
  }

  async updateUserNutritionProgram(id: string, program: Partial<UserHasNutritionProgram>): Promise<UserHasNutritionProgram | null> {
    const parsedId = parseInt(id, 10);
    const programToUpdate = await this.userHasNutritionProgramRepository.findOneBy({ id: parsedId });
    if (programToUpdate) {
      Object.assign(programToUpdate, program);
      return this.userHasNutritionProgramRepository.save(programToUpdate);
    }
    return null;
  }

  async deleteUserNutritionProgram(id: string): Promise<boolean> {
    const parsedId = parseInt(id, 10);
    const programToDelete = await this.userHasNutritionProgramRepository.findOneBy({ id: parsedId });
    if (programToDelete) {
      await this.userHasNutritionProgramRepository.remove(programToDelete);
      return true;
    }
    return false;
  }
}