import { Router } from "express";
import { addRecord, updateRecord } from "../controllers/recordController.js";

const router = Router();

router.post("/record", addRecord);
router.put("/record", updateRecord);

export default router;
