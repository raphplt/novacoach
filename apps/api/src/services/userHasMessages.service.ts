import { AppDataSource } from "../../ormconfig";
import { UserHasMessage } from "../entity/userHasMessages";

export class UserHasMessageService {
  private userHasMessageRepository = AppDataSource.getRepository(UserHasMessage);

  async getAllUserMessages(): Promise<UserHasMessage[]> {
    return this.userHasMessageRepository.find();
  }

  async getUserMessageById(id: string): Promise<UserHasMessage | null> {
    const parsedId = parseInt(id, 10);
    return this.userHasMessageRepository.findOneBy({
      id: parsedId,
    });
  }

  async createUserMessage(userMessage: Partial<UserHasMessage>): Promise<UserHasMessage> {
    const newUserMessage = this.userHasMessageRepository.create(userMessage);
    return this.userHasMessageRepository.save(newUserMessage);
  }

  async updateUserMessage(id: string, userMessage: Partial<UserHasMessage>): Promise<UserHasMessage | null> {
    const parsedId = parseInt(id, 10);
    const userMessageToUpdate = await this.userHasMessageRepository.findOneBy({ id: parsedId });
    if (userMessageToUpdate) {
      Object.assign(userMessageToUpdate, userMessage);
      return this.userHasMessageRepository.save(userMessageToUpdate);
    }
    return null;
  }

  async deleteUserMessage(id: string): Promise<boolean> {
    const parsedId = parseInt(id, 10);
    const userMessageToDelete = await this.userHasMessageRepository.findOneBy({ id: parsedId });
    if (userMessageToDelete) {
      await this.userHasMessageRepository.remove(userMessageToDelete);
      return true;
    }
    return false;
  }
}