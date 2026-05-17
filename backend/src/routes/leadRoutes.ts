import express from "express";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  exportLeadsCsv,
} from "../controllers/leadController";
import { protect } from "../middleware/authMiddleware";
import { adminOnly } from "../middleware/roleMiddleware";

const router = express.Router();

router.route("/")
  .post(protect, createLead)
  .get(protect, getLeads);

router.route("/export")
  .get(protect, adminOnly, exportLeadsCsv);

router.route("/:id")
  .get(protect, getLeadById)
  .put(protect, updateLead)
  .delete(protect, adminOnly, deleteLead);

export default router;
