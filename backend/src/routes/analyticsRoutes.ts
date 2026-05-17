import { Router } from "express";
import {
  getAnalyticsStats,
  getMonthlyData,
  getSourceData
} from "../controllers/analyticsController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// All analytics routes require authentication
router.use(protect);

// Sales User only routes
router.get(
  "/stats",
  (req, res, next) => {
    if (req.user?.role === "Sales User") {
      next();
    } else {
      res.status(403);
      next(new Error("Not authorized as a Sales User"));
    }
  },
  getAnalyticsStats
);

router.get(
  "/monthly",
  (req, res, next) => {
    if (req.user?.role === "Sales User") {
      next();
    } else {
      res.status(403);
      next(new Error("Not authorized as a Sales User"));
    }
  },
  getMonthlyData
);

router.get(
  "/sources",
  (req, res, next) => {
    if (req.user?.role === "Sales User") {
      next();
    } else {
      res.status(403);
      next(new Error("Not authorized as a Sales User"));
    }
  },
  getSourceData
);

export default router;