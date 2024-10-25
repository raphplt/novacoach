import { Router } from 'express';
import { SportController } from '../controllers/sport.controller';

const router = Router();
const sportController = new SportController();

/**
 * @swagger
 * /api/sports:
 *   get:
 *     tags: [Sports]
 *     summary: Retrieve a list of sports
 *     responses:
 *       200:
 *         description: A list of sports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#../entity/sport'
 */
router.get('/sports', (req, res) => sportController.getAllSport(req, res));

/**
 * @swagger
 * /api/sports/{id}:
 *   get:
 *     tags: [Sports]
 *     summary: Retrieve a single sport by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the sport to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The sport
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/sport'
 *       404:
 *         description: Sport not found
 */
router.get('/sports/:id', (req, res) => sportController.getSportById(req, res));

/**
 * @swagger
 * /api/sports:
 *   post:
 *     tags: [Sports]
 *     summary: Create a new sport
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#../entity/sport'
 *     responses:
 *       201:
 *         description: The created sport
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/sport'
 */
router.post('/sports', (req, res) => sportController.createSport(req, res));

/**
 * @swagger
 * /api/sports/{id}:
 *   put:
 *     tags: [Sports]
 *     summary: Update a sport
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the sport to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#../entity/sport'
 *     responses:
 *       200:
 *         description: The updated sport
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/sport'
 *       404:
 *         description: Sport not found
 */
router.put('/sports/:id', (req, res) => sportController.updateSport(req, res));

/**
 * @swagger
 * /api/sports/{id}:
 *   delete:
 *     tags: [Sports]
 *     summary: Delete a sport
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the sport to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sport deleted
 *       404:
 *         description: Sport not found
 */
router.delete('/sports/:id', (req, res) => sportController.deleteSport(req, res));

export default router;
