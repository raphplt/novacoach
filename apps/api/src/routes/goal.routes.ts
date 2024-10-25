import { Router } from "express";
import { GoalController } from "../controllers/goal.controller";

const router = Router();
const goalController = new GoalController();

/**
 * @swagger
 * /api/goals:
 *   get:
 *     tags: [Goals]
 *     summary: Retrieve a list of goals
 *     responses:
 *       200:
 *         description: A list of goals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Goal'
 */
router.get('/goals', (req, res) => goalController.getAllGoals(req, res));

/**
 * @swagger
 * /api/goals:
 *   post:
 *     tags: [Goals]
 *     summary: Create a new goal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Goal'
 *     responses:
 *       201:
 *         description: The created goal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Goal'
 */
router.post('/goals', (req, res) => goalController.createGoal(req, res));

/**
 * @swagger
 * /api/goals/{id}:
 *   put:
 *     tags: [Goals]
 *     summary: Update a goal
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the goal to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Goal'
 *     responses:
 *       200:
 *         description: The updated goal
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Goal'
 *       404:
 *         description: Goal not found
 */
router.put('/goals/:id', (req, res) => goalController.updateGoal(req, res));

/**
 * @swagger
 * /api/goals/{id}:
 *   delete:
 *     tags: [Goals]
 *     summary: Delete a goal
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the goal to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Goal deleted
 *       404:
 *         description: Goal not found
 */
router.delete('/goals/:id', (req, res) => goalController.deleteGoal(req, res));

export default router;
