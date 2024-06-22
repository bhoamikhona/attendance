import { Router } from "express";
import {
  addRecord,
  updateRecord,
  getUserRecords,
} from "../controllers/recordController.js";

const router = Router();

router.post("/record", addRecord);
router.put("/record", updateRecord);
router.get("/", getUserRecords);

export default router;
