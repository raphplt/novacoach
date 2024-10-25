import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Express } from "express";
import { userSchema } from "./swaggerSchemas/userSchema";
import { sportSchema } from "./swaggerSchemas/sportSchema";
import { exerciceSchema } from "./swaggerSchemas/exerciceSchema";
import {billSchema} from "./swaggerSchemas/billSchema";
import {goalSchema} from "./swaggerSchemas/goalSchema";
import {roleSchema} from "./swaggerSchemas/roleSchema";
import {licenceSchema} from "./swaggerSchemas/licenceSchema";
import { mealSchema } from "./swaggerSchemas/mealSchema";
import { nutritionProgramSchema } from "./swaggerSchemas/nutritionProgramSchema";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Novacoach API",
			version: "1.0.0",
		},
		schemas: {
			User: userSchema,
			Sport: sportSchema,
			Exercice: exerciceSchema,
			Bill: billSchema,
			Goal: goalSchema,
			Role: roleSchema,
			Licence: licenceSchema,
			Meal: mealSchema,
			NutritionProgram: nutritionProgramSchema

		},

	},
	apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
