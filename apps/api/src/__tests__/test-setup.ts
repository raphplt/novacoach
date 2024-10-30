import { AppDataSource } from "../../ormconfig";

beforeAll(async () => {
    await AppDataSource.initialize();
    console.log("Connexion à la base de données pour les tests");
});

afterAll(async () => {
    await AppDataSource.destroy();
    console.log("Déconnexion de la base de données après les tests");
});