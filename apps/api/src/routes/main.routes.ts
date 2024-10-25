import { Router } from "express";
import userRoutes from "./user.routes";
import structureRoutes from "./structure.routes";
import sportRoutes from "./sport.routes";
import exerciceRoutes from "./exercice.routes";
import roleRoutes from "./role.routes";
import goalRoutes from "./goal.routes";
import licenceRoutes from "./licence.routes";
import billRoutes from "./bill.routes";
import sportProgramRoutesRoutes from "./sportProgram.routes";
import coachRoutes from "./coach.routes";
import userSportProgramRoutes from "./userSportProgram.routes";
import sessionBookingRoutes from "./sessionBooking.routes";
import mealRoutes from "./meal.routes";
import nutritionProgramRoutes from "./nutritionProgram.routes";
import nutritionProgramMealRoutes from "./nutritionProgramMeal.routes";
import userDetailsHasSportsRoutes from "./userDetailsHasSports.routes";
import userDetailsRoutes from "./userDetails.routes";
import InvitationRoutes from "./invitation.routes";
import ConversationRoutes from "./conversation.routes";
import MessageRoutes from "./message.routes";

const router = Router();

const baseRoute = "/api";

router.use(baseRoute, userRoutes);
router.use(baseRoute, structureRoutes);
router.use(baseRoute, sportRoutes);
router.use(baseRoute, exerciceRoutes);
router.use(baseRoute, coachRoutes);
router.use(baseRoute, userSportProgramRoutes);
router.use(baseRoute, sessionBookingRoutes);
router.use(baseRoute, roleRoutes);
router.use(baseRoute, userDetailsRoutes);
router.use(baseRoute, userDetailsHasSportsRoutes);
router.use(baseRoute, goalRoutes);
router.use(baseRoute, licenceRoutes);
router.use(baseRoute, billRoutes);
router.use(baseRoute, sportProgramRoutesRoutes);
router.use(baseRoute, mealRoutes);
router.use(baseRoute, nutritionProgramRoutes);
router.use(baseRoute, nutritionProgramMealRoutes);
router.use(baseRoute, InvitationRoutes);
router.use(baseRoute, ConversationRoutes);
router.use(baseRoute, MessageRoutes);


export default router;
