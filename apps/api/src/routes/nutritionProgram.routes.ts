import { Router } from "express";
import { NutritionProgramController } from "../controllers/nutritionProgram.controller";

const router = Router();
const nutritionProgramController = new NutritionProgramController();

/**
 * @swagger
 * /api/nutritionPrograms:
 *   get:
 *     tags: [NutritionPrograms]
 *     summary: Retrieve a list of nutrition programs
 *     responses:
 *       200:
 *         description: A list of nutrition programs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#../entity/nutritionProgram'
 */
router.get("/nutritionPrograms", (req, res) =>
	nutritionProgramController.getAllNutritionProgram(req, res),
);

/**
 * @swagger
 * /api/nutritionProgram/{id}:
 *   get:
 *     tags: [NutritionProgram]
 *     summary: Retrieve a single nutrition program by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the nutrition program to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The nutrition program
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/nutritionProgram'
 *       404:
 *         description: Nutrition program not found
 */
router.get("/nutritionProgram/:id", (req, res) =>
	nutritionProgramController.getNutritionProgramById(req, res),
);

/**
 * @swagger
 * /api/nutritionPrograms:
 *   post:
 *     tags: [NutritionProgram]
 *     summary: Create a new nutrition program
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#../entity/nutritionProgram'
 *     responses:
 *       201:
 *         description: The created nutrition program
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/nutritionProgram'
 */
router.post("/nutritionPrograms", (req, res) =>
	nutritionProgramController.createNutritionProgram(req, res),
);

/**
 * @swagger
 * /api/nutritionProgram/{id}:
 *   put:
 *     tags: [NutritionProgram]
 *     summary: Update a nutrition program
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the nutrition program to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#../entity/nutritionProgram'
 *     responses:
 *       200:
 *         description: The updated nutrition program
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/nutritionProgram'
 *       404:
 *         description: Nutrition program not found
 */
router.put("/nutritionProgram/:id", (req, res) =>
	nutritionProgramController.updateNutritionProgram(req, res),
);

/**
 * @swagger
 * /api/nutritionProgram/{id}:
 *   delete:
 *     tags: [NutritionProgram]
 *     summary: Delete a nutrition program
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the nutrition program to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nutrition program deleted
 *       404:
 *         description: Nutrition program not found
 */
router.delete("/nutritionProgram/:id", (req, res) =>
	nutritionProgramController.deleteNutritionProgram(req, res),
);

router.get("/nutritionProgram/structure/:structureId", (req, res) =>
	nutritionProgramController.getNutritionProgramByStructureId(req, res),
);


export default router;
