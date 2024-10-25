import { Router } from "express";
import { SessionBookingController } from "../controllers/sessionBooking.controller";

const router = Router();
const sessionBookingController = new SessionBookingController();

router.get("/sessionBookings", (req, res) =>
	sessionBookingController.getAllSessionBookings(req, res)
);

router.get("/sessionBookings/:id", (req, res) =>
	sessionBookingController.getSessionBookingById(req, res)
);

router.post("/sessionBookings", (req, res) =>
	sessionBookingController.createSessionBooking(req, res)
);

router.put("/sessionBookings/:id", (req, res) =>
	sessionBookingController.updateSessionBooking(req, res)
);

router.delete("/sessionBookings/:id", (req, res) =>
	sessionBookingController.deleteSessionBooking(req, res)
);

export default router;
