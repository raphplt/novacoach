import { Router } from "express";
import { UserSportProgramController } from "../controllers/userSportProgram.controller";

const router = Router();
const userSportProgramController = new UserSportProgramController();

router.get("/userSportPrograms", (req, res) =>
	userSportProgramController.getAllUserSportPrograms(req, res)
);
router.get("/userSportPrograms/:id", (req, res) =>
	userSportProgramController.getUserSportProgramById(req, res)
);
router.post("/userSportPrograms", (req, res) =>
	userSportProgramController.createUserSportProgram(req, res)
);
router.put("/userSportPrograms/:id", (req, res) =>
	userSportProgramController.updateUserSportProgram(req, res)
);
router.delete("/userSportPrograms/:id", (req, res) =>
	userSportProgramController.deleteUserSportProgram(req, res)
);

export default router;
