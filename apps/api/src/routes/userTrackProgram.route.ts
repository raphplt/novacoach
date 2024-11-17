import { Router } from "express";
import { UserTrackProgramController } from "../controllers/userTrackProgram.controller";

const router = Router();
const userTrackProgramController = new UserTrackProgramController();

/**
 * @swagger
 * /user-track-programs:
 *   get:
 *     tags: [UserTrackPrograms]
 *     summary: Retrieve a list of user track programs
 *     responses:
 *       200:
 *         description: A list of user track programs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserTrackProgram'
 */
router.get('/user-track-programs', (req, res) => userTrackProgramController.getAllUserTrackPrograms(req, res));

/**
 * @swagger
 * /user-track-programs:
 *   post:
 *     tags: [UserTrackPrograms]
 *     summary: Create a new user track program
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserTrackProgram'
 *     responses:
 *       201:
 *         description: The created user track program
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserTrackProgram'
 */
router.post('/user-track-programs', (req, res) => userTrackProgramController.createUserTrackProgram(req, res));

/**
 * @swagger
 * /user-track-programs/{id}:
 *   get:
 *     tags: [UserTrackPrograms]
 *     summary: Retrieve a single user track program by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user track program to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The requested user track program
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserTrackProgram'
 *       404:
 *         description: User track program not found
 */
router.get('/user-track-programs/:id', (req, res) => userTrackProgramController.getUserTrackProgramById(req, res));

/**
 * @swagger
 * /user-track-programs/{id}:
 *   put:
 *     tags: [UserTrackPrograms]
 *     summary: Update a user track program
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user track program to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserTrackProgram'
 *     responses:
 *       200:
 *         description: The updated user track program
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserTrackProgram'
 *       404:
 *         description: User track program not found
 */
router.put('/user-track-programs/:id', (req, res) => userTrackProgramController.updateUserTrackProgram(req, res));

/**
 * @swagger
 * /user-track-programs/{id}:
 *   delete:
 *     tags: [UserTrackPrograms]
 *     summary: Delete a user track program
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user track program to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User track program deleted
 *       404:
 *         description: User track program not found
 */
router.delete('/user-track-programs/:id', (req, res) => userTrackProgramController.deleteUserTrackProgram(req, res));

export default router;
