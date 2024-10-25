import { AppDataSource } from '../../ormconfig';
import { Role } from '../entity/role';

export class RoleService {
    private roleRepository = AppDataSource.getRepository(Role);

    async getAllRoles(): Promise<Role[]> {
        return this.roleRepository.find();
    }

    async createRole(role: Partial<Role>): Promise<Role> {
        const newRole = this.roleRepository.create(role);
        return this.roleRepository.save(newRole);
    }

    async updateRole(id: string, role: Partial<Role>): Promise<Role | null> {
        const roleToUpdate = await this.roleRepository.findOneBy({ id: parseInt(id, 10) });
        if (roleToUpdate) {
            Object.assign(roleToUpdate, role);
            return this.roleRepository.save(roleToUpdate);
        }
        return null;
    }

    async deleteRole(id: string): Promise<boolean> {
        const roleToDelete = await this.roleRepository.findOneBy({ id: parseInt(id, 10) });
        if (roleToDelete) {
            await this.roleRepository.remove(roleToDelete);
            return true;
        }
        return false;
    }
}
