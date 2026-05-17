import express from "express";
import { registerUser, loginUser, getSalesUsers } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/sales-users", protect, getSalesUsers);

export default router;
