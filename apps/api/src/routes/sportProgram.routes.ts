import { Router } from 'express';
import { SportProgramController } from '../controllers/sportProgram.controller';

const router = Router();
const sportProgramController = new SportProgramController();

/**
 * @swagger
 * /api/sportPrograms:
 *   get:
 *     tags: [SportPrograms]
 *     summary: Retrieve a list of sport programs
 *     responses:
 *       200:
 *         description: A list of sport programs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#../entity/sportProgram'
 */
router.get('/sportPrograms', (req, res) => sportProgramController.getAllSportProgram(req, res));

/**
 * @swagger
 * /api/sportPrograms/{id}:
 *   get:
 *     tags: [SportPrograms]
 *     summary: Retrieve a single sport program by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the sport program to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The sport program
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/sportProgram'
 *       404:
 *         description: Sport program not found
 */
router.get('/sportProgram/:id', (req, res) => sportProgramController.getSportProgramById(req, res));

/**
 * @swagger
 * /api/sportPrograms:
 *   post:
 *     tags: [SportPrograms]
 *     summary: Create a new sport program
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#../entity/sportProgram'
 *     responses:
 *       201:
 *         description: The created sport program
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/sportProgram'
 */
router.post('/sportPrograms', (req, res) => sportProgramController.createSportProgram(req, res));

/**
 * @swagger
 * /api/sportPrograms/{id}:
 *   put:
 *     tags: [SportPrograms]
 *     summary: Update a sport program
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the sport program to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#../entity/sportProgram'
 *     responses:
 *       200:
 *         description: The updated sport program
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/sportProgram'
 *       404:
 *         description: Sport program not found
 */
router.put('/sportProgram/:id', (req, res) => sportProgramController.updateSportProgram(req, res));

/**
 * @swagger
 * /api/sportPrograms/{id}:
 *   delete:
 *     tags: [SportPrograms]
 *     summary: Delete a sport program
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the sport program to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sport program deleted
 *       404:
 *         description: Sport program not found
 */
router.delete('/sportProgram/:id', (req, res) => sportProgramController.deleteSportProgram(req, res));

router.get('/sportProgram/structure/:structureId', (req, res) => sportProgramController.getSportProgramByStructureId(req, res));

export default router;
