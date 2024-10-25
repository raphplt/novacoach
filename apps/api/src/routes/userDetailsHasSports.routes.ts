import { Router } from 'express';
import { UserDetailsHasSportsController } from '../controllers/userdetailshassports.controller';

const router = Router();
const userDetailsHasSportsController = new UserDetailsHasSportsController();

/**
 * @swagger
 * /api/userdetailshassports:
 *   get:
 *     tags: [UserDetailsHasSports]
 *     summary: Retrieve a list of user details and their associated sports
 *     responses:
 *       200:
 *         description: A list of user details and their associated sports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserDetailsHasSports'
 */
router.get('/userdetailshassports', (req, res) => userDetailsHasSportsController.getAllUserDetailsHasSports(req, res));

/**
 * @swagger
 * /api/userdetailshassports:
 *   post:
 *     tags: [UserDetailsHasSports]
 *     summary: Create a new user details and sports association
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDetailsHasSports'
 *     responses:
 *       201:
 *         description: The created user details and sports association
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetailsHasSports'
 */
router.post('/userdetailshassports', (req, res) => userDetailsHasSportsController.createUserDetailsHasSports(req, res));

/**
 * @swagger
 * /api/userdetailshassports/{id}:
 *   put:
 *     tags: [UserDetailsHasSports]
 *     summary: Update a user details and sports association
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the user details and sports association to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDetailsHasSports'
 *     responses:
 *       200:
 *         description: The updated user details and sports association
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetailsHasSports'
 *       404:
 *         description: User details and sports association not found
 */
router.put('/userdetailshassports/:id', (req, res) => userDetailsHasSportsController.updateUserDetailsHasSports(req, res));

/**
 * @swagger
 * /api/userdetailshassports/{id}:
 *   delete:
 *     tags: [UserDetailsHasSports]
 *     summary: Delete a user details and sports association
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the user details and sports association to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User details and sports association deleted
 *       404:
 *         description: User details and sports association not found
 */
router.delete('/userdetailshassports/:id', (req, res) => userDetailsHasSportsController.deleteUserDetailsHasSports(req, res));

export default router;
