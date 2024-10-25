import { Router } from "express";
import { CoachController } from "../controllers/coach.controller";

const router = Router();
const coachController = new CoachController();

router.get("/coaches", (req, res) => coachController.getAllCoaches(req, res));

router.get("/coaches/:id", (req, res) =>
	coachController.getCoachById(req, res),
);

router.get("/coaches/structure/:structureId", (req, res) =>
	coachController.getCoachByStructureId(req, res),
);

router.get("/coaches/user/:id", (req, res) =>
	coachController.getCoachByUserId(req, res),
);

router.post("/coaches", (req, res) => coachController.createCoach(req, res));

router.put("/coaches/:id", (req, res) => coachController.updateCoach(req, res));

router.delete("/coaches/:id", (req, res) =>
	coachController.deleteCoach(req, res),
);

export default router;