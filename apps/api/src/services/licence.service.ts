import { AppDataSource } from '../../ormconfig';
import { Licence } from '../entity/licence';

export class LicenceService {
    private licenceRepository = AppDataSource.getRepository(Licence);

    async getAllLicences(): Promise<Licence[]> {
        return this.licenceRepository.find({ relations: ["userDetails"] });
    }

    async getLicenceById(id: string): Promise<Licence | null> {
        return this.licenceRepository.findOne({
            where: { idLicence: parseInt(id, 10) },
            relations: ["userDetails"], // Inclut les relations si nécessaire
        });
    }

    async createLicence(licence: Partial<Licence>): Promise<Licence> {
        const newLicence = this.licenceRepository.create(licence);
        return this.licenceRepository.save(newLicence);
    }

    async updateLicence(id: string, licence: Partial<Licence>): Promise<Licence | null> {
        const licenceToUpdate = await this.licenceRepository.findOneBy({ idLicence: parseInt(id, 10) });
        if (licenceToUpdate) {
            Object.assign(licenceToUpdate, licence);
            return this.licenceRepository.save(licenceToUpdate);
        }
        return null;
    }

    async deleteLicence(id: string): Promise<boolean> {
        const licenceToDelete = await this.licenceRepository.findOneBy({ idLicence: parseInt(id, 10) });
        if (licenceToDelete) {
            await this.licenceRepository.remove(licenceToDelete);
            return true;
        }
        return false;
    }
}
