import { Router } from "express";
import { UserHasNutritionProgramController } from "../controllers/userHasNutritionProgram.controller";

const router = Router();
const userHasNutritionProgramController = new UserHasNutritionProgramController();

router.get("/user-nutrition-programs", (req, res) => userHasNutritionProgramController.getAllUserNutritionPrograms(req, res));
router.get("/user-nutrition-programs/:id", (req, res) => userHasNutritionProgramController.getUserNutritionProgramById(req, res));
router.post("/user-nutrition-programs", (req, res) => userHasNutritionProgramController.createUserNutritionProgram(req, res));
router.put("/user-nutrition-programs/:id", (req, res) => userHasNutritionProgramController.updateUserNutritionProgram(req, res));
router.delete("/user-nutrition-programs/:id", (req, res) => userHasNutritionProgramController.deleteUserNutritionProgram(req, res));

export default router;