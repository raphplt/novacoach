import { DataSource } from "typeorm";
import { config } from "dotenv";

// Charger les variables d'environnement depuis le fichier .env
config();

// Entities
import { User } from "./src/entity/user";
import { Structure } from "./src/entity/structure";
import { Sport } from "./src/entity/sport";
import { Exercice } from "./src/entity/exercice";
import { SportProgram } from "./src/entity/sportProgram";
import { Coach } from "./src/entity/coach";
import { UserSportProgram } from "./src/entity/userSportProgram";
import { SessionBooking } from "./src/entity/sessionBooking";
import { UserDetails } from "./src/entity/userDetails";
import { UserDetailsHasSports } from "./src/entity/userdetailshassports";
import { Role } from "./src/entity/role";
import { Goal } from "./src/entity/goal";
import { Licence } from "./src/entity/licence";
import { Bill } from "./src/entity/bill";
import { Meal } from "./src/entity/meal";
import { NutritionProgram } from "./src/entity/nutritionProgram";
import { NutritionProgramMeal } from "./src/entity/nutritionProgramMeal";
import { Invitation } from "./src/entity/invitation";
import { Message } from "./src/entity/message";
import { UserHasNutritionProgram } from "./src/entity/userHasNutritionProgram";
import { Conversation } from "./src/entity/conversation";
import { SportProgramHasExercice } from "./src/entity/sportProgramHasExercice";
import { Weight } from "./src/entity/weight";
import { BMI } from "./src/entity/bmi";
import { FatMass } from "./src/entity/fatMass";
import { MuscleMass } from "./src/controllers/muscleMass";
import { Height } from "./src/entity/height";

console.log(process.env.PGHOST);
console.log(process.env.PGPORT);
console.log(process.env.POSTGRES_USER);
console.log(process.env.POSTGRES_PASSWORD);
console.log(process.env.PGDATABASE);



export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.PGHOST,
	port: parseInt(process.env.PGPORT as string, 10),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.PGDATABASE,
	synchronize: true,
	logging: false,
	entities: [
		User,
		Structure,
		Sport,
		Exercice,
		SportProgram,
		Coach,
		UserSportProgram,
		SessionBooking,
		UserDetails,
		UserDetailsHasSports,
		UserHasNutritionProgram,
		Role,
		Goal,
		Licence,
		Bill,
		Meal,
		NutritionProgram,
		NutritionProgramMeal,
		Invitation,
		Message,
		Conversation,
		SportProgramHasExercice,
		Weight,
		BMI,
		FatMass,
		MuscleMass,
		Height,
	],
	migrations: ["src/migration/**/*.ts"],
	subscribers: ["src/subscriber/**/*.ts"],
});