import { Request, Response } from 'express';
import { RoleService } from '../services/role.service';

export class RoleController {
    private roleService = new RoleService();

    async getAllRoles(req: Request, res: Response): Promise<void> {
        try {
            const roles = await this.roleService.getAllRoles();
            res.status(200).json(roles);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async createRole(req: Request, res: Response): Promise<void> {
        try {
            const role = await this.roleService.createRole(req.body);
            res.status(201).json(role);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateRole(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const role = await this.roleService.updateRole(id, req.body);
            if (role) {
                res.status(200).json(role);
            } else {
                res.status(404).json({ message: 'Role not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteRole(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const isDeleted = await this.roleService.deleteRole(id);
            if (isDeleted) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: 'Role not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
