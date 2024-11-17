import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import multer from "multer";
import { storage } from "../cloudinaryConfig";

const router = Router();
const upload = multer({ storage });
const userController = new UserController();

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#../entity/user'
 */
router.get("/users", (req, res) => userController.getAllUsers(req, res));

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a single user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/user'
 *       404:
 *         description: User not found
 */
router.get("/users/:id", (req, res) => userController.getUserById(req, res));


/**
 * @swagger
 * /api/users/{userId}/profile-image:
 *   put:
 *     tags: [Users]
 *     summary: Update the profile image of a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to update the profile image for
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User profile image updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: No file provided
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put("/users/:userId/profile-image", upload.single("file"), (req, res) => 
	userController.updateUserProfileImage(req, res)
);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/entity/user'
 *     responses:
 *       201:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/user'
 */
router.post("/auth/register", (req, res) =>
	userController.createUser(req, res),
);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: [Users]
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The logged in user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/user'
 */
router.post("/auth/login", (req, res) => userController.loginUser(req, res));

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#../entity/user'
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#../entity/user'
 *       404:
 *         description: User not found
 */

router.get("/users/profile/:id", (req, res) =>
	userController.getProfile(req, res),
);
router.put("/users/:id", (req, res) => userController.updateUser(req, res));

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete("/users/:id", (req, res) => userController.deleteUser(req, res));

/**
 * @swagger
 * /api/user/coach/{coachId}:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a list of users by coachId
 *     parameters:
 *       - in: path
 *         name: coachId
 *         required: true
 *         description: The id of the coach to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#../entity/user'
 *       404:
 *         description: User not found
 */
router.get("/user/coach/:coachId", (req, res) =>
	userController.getUserByCoachId(req, res),
);

/**
 * @swagger
 * /api/user/student/{studentId}:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a list of users by studentId
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: The id of the student to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#../entity/user'
 *       404:
 *         description: User not found
 */
router.get("/user/studentsByCoachId/:coachId", (req, res) =>
	userController.getStudentByCoachID(req, res),
);

/**
 * @swagger
 * /api/user/studentsByStructureID/{structureId}:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a list of users by structureId
 *     parameters:
 *       - in: path
 *         name: structureId
 *         required: true
 *         description: The id of the structure to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#../entity/user'
 *       404:
 *         description: User not found
 */
router.get("/user/studentsByStructureID/:structureId", (req, res) =>
	userController.getStudentByStructureID(req, res),
);

export default router;