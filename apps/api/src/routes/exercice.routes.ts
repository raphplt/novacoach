import { Router } from "express";
import { ExerciceController } from "../controllers/exercice.controller";

const router = Router();
const exerciceController = new ExerciceController();

/**
 * @swagger
 * /api/exercices:
 *   get:
 *     tags: [Exercices]
 *     summary: Retrieve a list of exercices
 *     responses:
 *       200:
 *         description: A list of exercices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#../entity/exercice'
 */
router.get("/exercices", (req, res) => exerciceController.getAllExercice(req, res));

/**
 * @swagger
 * /api/exercices/{id}:
 *   get:
 *     tags: [Exercices]
 *     summary: Retrieve a single exercice by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the exercice to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The exercice
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/exercice'
 *       404:
 *         description: Exercice not found
 */
router.get("/exercices/:id", (req, res) => exerciceController.getExerciceById(req, res));

/**
 * @swagger
 * /api/exercices:
 *   post:
 *     tags: [Exercices]
 *     summary: Create a new exercice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#../entity/exercice'
 *     responses:
 *       201:
 *         description: The created exercice
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/exercice'
 */
router.post("/exercices", (req, res) => exerciceController.createExercice(req, res));

/**
 * @swagger
 * /api/exercices/{id}:
 *   put:
 *     tags: [Exercices]
 *     summary: Update an exercice
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the exercice to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#../entity/exercice'
 *     responses:
 *       200:
 *         description: The updated exercice
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/exercice'
 *       404:
 *         description: Exercice not found
 */
router.put("/exercices/:id", (req, res) => exerciceController.updateExercice(req, res));

/**
 * @swagger
 * /api/exercices/{id}:
 *   delete:
 *     tags: [Exercices]
 *     summary: Delete an exercice
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the exercice to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exercice deleted
 *       404:
 *         description: Exercice not found
 */
router.delete("/exercices/:id", (req, res) => exerciceController.deleteExercice(req, res));

export default router;
