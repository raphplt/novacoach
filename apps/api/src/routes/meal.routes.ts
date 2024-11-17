import { Router } from "express";
import { MealController } from "../controllers/meal.controller";

const router = Router();
const mealController = new MealController();

/**
 * @swagger
 * /api/meals:
 *   get:
 *     tags: [Meal]
 *     summary: Retrieve a list of meals
 *     responses:
 *       200:
 *         description: A list of meals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#../entity/meal'
 */
router.get("/meals", (req, res) => mealController.getAllMeal(req, res));

/**
 * @swagger
 * /api/meal/{id}:
 *   get:
 *     tags: [Meal]
 *     summary: Retrieve a single meal by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the meal to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The meal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/meal'
 *       404:
 *         description: Meal not found
 */
router.get("/meal/:id", (req, res) => mealController.getMealById(req, res));

/**
 * @swagger
 * /api/meal:
 *   post:
 *     tags: [Meal]
 *     summary: Create a new meal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#../entity/meal'
 *     responses:
 *       201:
 *         description: The created meal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/meal'
 */
router.post("/meal", (req, res) => mealController.createMeal(req, res));

/**
 * @swagger
 * /api/meal/{id}:
 *   put:
 *     tags: [Meal]
 *     summary: Update a meal
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the meal to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#../entity/meal'
 *     responses:
 *       200:
 *         description: The updated meal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/meal'
 *       404:
 *         description: Meal not found
 */
router.put("/meal/:id", (req, res) => mealController.updateMeal(req, res));

/**
 * @swagger
 * /api/meal/{id}:
 *   delete:
 *     tags: [Meal]
 *     summary: Delete a meal
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the meal to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Meal deleted
 *       404:
 *         description: Meal not found
 */
router.delete("/meal/:id", (req, res) => mealController.deleteMeal(req, res));

router.get('/meal/nutritionProgram/:nutritionProgramId', (req, res) => mealController.getMealsByNutritionProgramId(req, res));

router.get('/meal/structure/:structureId', (req, res) => mealController.getMealByStructureId(req, res));
export default router;
