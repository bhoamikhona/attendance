import { Router } from "express";
import {
  register,
  login,
  logout,
  getAllUsers,
  getUser,
} from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/users", getAllUsers);
router.get("/user/:id", getUser);

export default router;
