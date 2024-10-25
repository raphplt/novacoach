import { Router } from "express";
import { LicenceController } from "../controllers/licence.controller";

const router = Router();
const licenceController = new LicenceController();

/**
 * @swagger
 * /api/licences:
 *   get:
 *     tags: [Licences]
 *     summary: Retrieve a list of licences
 *     responses:
 *       200:
 *         description: A list of licences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Licence'
 */
router.get('/licences', (req, res) => licenceController.getAllLicences(req, res));

/**
 * @swagger
 * /api/licences:
 *   post:
 *     tags: [Licences]
 *     summary: Create a new licence
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Licence'
 *     responses:
 *       201:
 *         description: The created licence
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Licence'
 */
router.post('/licences', (req, res) => licenceController.createLicence(req, res));

/**
 * @swagger
 * /api/licences/{id}:
 *   put:
 *     tags: [Licences]
 *     summary: Update a licence
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the licence to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Licence'
 *     responses:
 *       200:
 *         description: The updated licence
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Licence'
 *       404:
 *         description: Licence not found
 */
router.put('/licences/:id', (req, res) => licenceController.updateLicence(req, res));

/**
 * @swagger
 * /api/licences/{id}:
 *   delete:
 *     tags: [Licences]
 *     summary: Delete a licence
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the licence to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Licence deleted
 *       404:
 *         description: Licence not found
 */
router.delete('/licences/:id', (req, res) => licenceController.deleteLicence(req, res));

export default router;
