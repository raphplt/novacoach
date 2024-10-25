import { Router } from "express";
import { UserDetailsController } from "../controllers/userdetails.controller";

const router = Router();
const userDetailsController = new UserDetailsController();

/**
 * @swagger
 * /api/userdetails:
 *   get:
 *     tags: [UserDetails]
 *     summary: Retrieve a list of user details
 *     responses:
 *       200:
 *         description: A list of user details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserDetails'
 */
router.get("/userdetails", (req, res) =>
	userDetailsController.getAllUserDetails(req, res),
);

/**
 * @swagger
 * /api/userdetails/{id}:
 *   get:
 *     tags: [UserDetails]
 *     summary: Retrieve a user details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the user details to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetails'
 *       404:
 *         description: User details not found
 */
router.get("/userdetails/user/:userId", (req, res) =>
	userDetailsController.getUserDetailsByUserId(req, res),
);

/**
 * @swagger
 * /api/userdetails:
 *   post:
 *     tags: [UserDetails]
 *     summary: Create a new user details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDetails'
 *     responses:
 *       201:
 *         description: The created user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetails'
 */
router.post("/userdetails", (req, res) =>
	userDetailsController.createUserDetails(req, res),
);

/**
 * @swagger
 * /api/userdetails/user/{userId}:
 *   post:
 *     tags: [UserDetails]
 *     summary: Create user details for a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDetails'
 *     responses:
 *       201:
 *         description: The created user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetails'
 *       404:
 *         description: User not found
 */
router.post("/userdetails/user/:userId", (req, res) =>
	userDetailsController.createUserDetailsForUser(req, res),
);

/**
 * @swagger
 * /api/userdetails/{id}:
 *   put:
 *     tags: [UserDetails]
 *     summary: Update user details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the user details to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDetails'
 *     responses:
 *       200:
 *         description: The updated user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetails'
 *       404:
 *         description: User details not found
 */
router.put("/userdetails/:id", (req, res) =>
	userDetailsController.updateUserDetails(req, res),
);

/**
 * @swagger
 * /api/userdetails/{id}:
 *   delete:
 *     tags: [UserDetails]
 *     summary: Delete user details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the user details to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User details deleted
 *       404:
 *         description: User details not found
 */
router.delete("/userdetails/:id", (req, res) =>
	userDetailsController.deleteUserDetails(req, res),
);

export default router;
