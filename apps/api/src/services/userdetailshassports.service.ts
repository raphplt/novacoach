import { AppDataSource } from '../../ormconfig';
import { UserDetailsHasSports } from "../entity/userdetailshassports";

export class UserDetailsHasSportsService {
    private userDetailsHasSportsRepository = AppDataSource.getRepository(UserDetailsHasSports);

    async getAllUserDetailsHasSports(): Promise<UserDetailsHasSports[]> {
        return this.userDetailsHasSportsRepository.find({ relations: ["userDetails", "sport"] });
    }

    async createUserDetailsHasSports(userDetailsHasSports: Partial<UserDetailsHasSports>): Promise<UserDetailsHasSports> {
        const newUserDetailsHasSports = this.userDetailsHasSportsRepository.create(userDetailsHasSports);
        return this.userDetailsHasSportsRepository.save(newUserDetailsHasSports);
    }

    async updateUserDetailsHasSports(id: string, userDetailsHasSports: Partial<UserDetailsHasSports>): Promise<UserDetailsHasSports | null> {
        const userDetailsHasSportsToUpdate = await this.userDetailsHasSportsRepository.findOneBy({ id: parseInt(id, 10) });
        if (userDetailsHasSportsToUpdate) {
            Object.assign(userDetailsHasSportsToUpdate, userDetailsHasSports);
            return this.userDetailsHasSportsRepository.save(userDetailsHasSportsToUpdate);
        }
        return null;
    }

    async deleteUserDetailsHasSports(id: string): Promise<boolean> {
        const userDetailsHasSportsToDelete = await this.userDetailsHasSportsRepository.findOneBy({ id: parseInt(id, 10) });
        if (userDetailsHasSportsToDelete) {
            await this.userDetailsHasSportsRepository.remove(userDetailsHasSportsToDelete);
            return true;
        }
        return false;
    }
}
