import { AppDataSource } from "../ormconfig";
import { seedRoles } from "./seeder/role.seeder";
import { seedUsers } from "./seeder/user.seeder";
import { seedCoaches } from "./seeder/coach.seeder";
import { seedExercices } from "./seeder/exercice.seeder";
import { seedBills } from "./seeder/bill.seeder";
import { seedLicences } from "./seeder/licence.seeder";
import { seedMeals } from "./seeder/meal.seeder";
import { seedMessages } from "./seeder/message.seeder";
import { seedUserHasNutritionPrograms } from "./seeder/userHasNutritionProgram.seeder";
import { seedNutritionPrograms } from "./seeder/nutritionProgram.seeder";
import { seedSportPrograms } from "./seeder/sportProgram.seeder";
import { seedStructures } from "./seeder/structure.seeder";
import { seedUserDetails } from "./seeder/userDetail.seeder";
import { seedSports } from "./seeder/sport.seeder";
import readline from "readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const askQuestion = (question: string): Promise<string> => {
	return new Promise((resolve) => rl.question(question, resolve));
};

const dropTableIfExists = async (tableName: string) => {
	try {
		console.log(`🗑️ Dropping table ${tableName}...`);
		await AppDataSource.query(
			`DROP TABLE IF EXISTS "${tableName}" CASCADE`,
		);
		console.log(`🗑️ Table ${tableName} has been dropped!`);
	} catch (err) {
		console.error(`❌ Error during dropping table ${tableName}:`, err);
	}
};

const dropDatabase = async () => {
	try {
		await dropTableIfExists("user_track_program");
		// Ajoutez d'autres tables si nécessaire
		console.log("🗑️ Database has been dropped!");
	} catch (err) {
		console.error("❌ Error during database drop:", err);
	}
};
const synchronizeDatabase = async () => {
	try {
		await AppDataSource.synchronize();
		console.log("🔄 Database schema has been synchronized!");
	} catch (err) {
		console.error("❌ Error during database synchronization:", err);
	}
};

const seedDatabase = async (count: number, dropDb: boolean) => {
	try {
		console.log("🌱 Seeding the database...");
		await AppDataSource.initialize();
		console.log("🚀 Data Source has been initialized!");

		if (dropDb) {
			await dropDatabase();
			await synchronizeDatabase();
		}

		await seedRoles();
		console.log("✅ Roles have been seeded!");

		await seedStructures(count);
		console.log("🏢 Structures have been seeded!");

		await seedUsers(count);
		console.log("👥 Users have been seeded!");

		await seedUserDetails(count);
		console.log("📋 UserDetails have been seeded!");

		await seedCoaches(count);
		console.log("🏋️ Coaches have been seeded!");

		await seedExercices(count);
		console.log("🏃 Exercices have been seeded!");

		await seedBills(count);
		console.log("💸 Bills have been seeded!");

		await seedLicences(count);
		console.log("📜 Licences have been seeded!");

		await seedMeals(count);
		console.log("🍽️ Meals have been seeded!");

		await seedMessages(count);
		console.log("✉️ Messages have been seeded!");

		await seedUserHasNutritionPrograms(count);
		console.log("🥗 UserHasNutritionPrograms have been seeded!");

		await seedNutritionPrograms(count);
		console.log("🍎 NutritionPrograms have been seeded!");

		await seedSports(count);
		console.log("⚽ Sports have been seeded!");

		await seedSportPrograms(count);
		console.log("🏅 SportPrograms have been seeded!");

		await AppDataSource.destroy();
		console.log("🛑 Data Source has been destroyed!");
	} catch (err) {
		console.error("❌ Error during Data Source initialization:", err);
	}
};

const main = async () => {
	const countStr = await askQuestion(
		"Enter the number of seeds to generate: ",
	);
	const count = parseInt(countStr, 10);

	if (isNaN(count) || count <= 0) {
		console.error(
			"❌ Invalid number of seeds. Please enter a positive integer.",
		);
		rl.close();
		return;
	}

	const dropDbStr = await askQuestion(
		"Do you want to drop the database first? (yes/no): ",
	);
	const dropDb =
		dropDbStr.toLowerCase() === "yes" || dropDbStr.toLowerCase() === "y";

	await seedDatabase(count, dropDb);
	rl.close();
};

main();