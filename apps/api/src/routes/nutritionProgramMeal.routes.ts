import { Router } from "express";
import { NutritionProgramMealController } from "../controllers/nutritionProgramMeal.controller";

const router = Router();
const nutritionProgramMealController = new NutritionProgramMealController();

router.get("/nutritionProgramsMeal", (req, res) =>
	nutritionProgramMealController.getAllNutritionProgramsMeal(req, res),
);
router.get("/nutritionProgramsMeal/:id", (req, res) =>
	nutritionProgramMealController.getNutritionProgramMealById(req, res),
);
router.post("/nutritionProgramsMeal", (req, res) =>
	nutritionProgramMealController.createNutritionProgramMeal(req, res),
);
router.put("/nutritionProgramsMeal/:id", (req, res) =>
	nutritionProgramMealController.updateNutritionProgramMeal(req, res),
);
router.delete("/nutritionProgramsMeal/:id", (req, res) =>
	nutritionProgramMealController.deleteNutritionProgramMeal(req, res),
);

export default router;
