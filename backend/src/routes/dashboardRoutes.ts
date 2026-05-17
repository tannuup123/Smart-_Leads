import { Router } from "express";
import {
  getDashboardStats,
  getRecentActivities,
  getUpcomingFollowups,
  getSalesTargets
} from "../controllers/dashboardController";
import { protect } from "../middleware/authMiddleware";
import { adminOnly } from "../middleware/roleMiddleware";

const router = Router();

// All dashboard routes require authentication
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
  getDashboardStats
);

router.get(
  "/activities",
  (req, res, next) => {
    if (req.user?.role === "Sales User") {
      next();
    } else {
      res.status(403);
      next(new Error("Not authorized as a Sales User"));
    }
  },
  getRecentActivities
);

router.get(
  "/followups",
  (req, res, next) => {
    if (req.user?.role === "Sales User") {
      next();
    } else {
      res.status(403);
      next(new Error("Not authorized as a Sales User"));
    }
  },
  getUpcomingFollowups
);

router.get(
  "/targets",
  (req, res, next) => {
    if (req.user?.role === "Sales User") {
      next();
    } else {
      res.status(403);
      next(new Error("Not authorized as a Sales User"));
    }
  },
  getSalesTargets
);

export default router;