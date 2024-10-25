import { AppDataSource } from "../../ormconfig";

const clearDatabase = async () => {
	try {
		await AppDataSource.initialize();
		console.log("Data Source has been initialized!");

		const queryRunner = AppDataSource.createQueryRunner();
		await queryRunner.connect();

		const tables = await queryRunner.getTables();
		for (const table of tables) {
			// Ignore system tables
			if (
				table.schema !== "pg_catalog" &&
				table.schema !== "information_schema"
			) {
				await queryRunner.query(
					`TRUNCATE TABLE "${table.name}" CASCADE`,
				);
			}
		}

		await queryRunner.release();
		console.log("All tables have been cleared!");

		await AppDataSource.destroy();
		console.log("Data Source has been destroyed!");
	} catch (err) {
		console.error("Error during Data Source initialization:", err);
	}
};

clearDatabase();
