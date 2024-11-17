import { Router } from "express";
import { StructureController } from "../controllers/structure.controller";
import multer from "multer";
import { storage } from "../cloudinaryConfig";

const router = Router();
const structureController = new StructureController();
const upload = multer({ storage });

router.get("/structures", (req, res) =>
	structureController.getAllStructures(req, res)
);
router.get("/structures/:id", (req, res) =>
	structureController.getStructureById(req, res)
);
router.post("/structures", upload.single("logo"), (req, res) =>
    structureController.createStructure(req, res)
);

router.put("/structures/:id", (req, res) =>
	structureController.updateStructure(req, res)
);
router.delete("/structures/:id", (req, res) =>
	structureController.deleteStructure(req, res)
);

export default router;
