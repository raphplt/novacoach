import { Router } from "express";
import { BillController } from "../controllers/bill.controller";

const billController = new BillController();
const router = Router();

/**
 * @swagger
 * /api/bills:
 *   get:
 *     tags: [Bills]
 *     summary: Retrieve a list of bills
 *     responses:
 *       200:
 *         description: A list of bills
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bill'
 */
router.get('/bills', (req, res) => billController.getAllBills(req, res));

/**
 * @swagger
 * /api/bills/{id}:
 *   get:
 *     tags: [Bills]
 *     summary: Retrieve a single bill by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the bill to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The bill
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bill'
 *       404:
 *         description: Bill not found
 */
router.get("/bills/:id", (req, res) => billController.getBillById(req, res));

/**
 * @swagger
 * /api/bills:
 *   post:
 *     tags: [Bills]
 *     summary: Create a new bill
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bill'
 *     responses:
 *       201:
 *         description: The created bill
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bill'
 */
router.post('/bills', (req, res) => billController.createBill(req, res));

/**
 * @swagger
 * /api/bills/{id}:
 *   put:
 *     tags: [Bills]
 *     summary: Update an existing bill
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the bill to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bill'
 *     responses:
 *       200:
 *         description: The updated bill
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bill'
 *       404:
 *         description: Bill not found
 */
router.put("/bills/:id", (req, res) => billController.updateBill(req, res));

/**
 * @swagger
 * /api/bills/{id}:
 *   delete:
 *     tags: [Bills]
 *     summary: Delete a bill
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the bill to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bill deleted
 *       404:
 *         description: Bill not found
 */
router.delete("/bills/:id", (req, res) => billController.deleteBill(req, res));

export default router;
