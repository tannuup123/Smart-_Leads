import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { Lead } from "../models/Lead";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]).optional(),
  source: z.enum(["Website", "Instagram", "Referral"]),
  assignedTo: z.string().optional(),
});

export const createLead = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = leadSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400);
      throw new Error(parsed.error.errors[0].message);
    }

    const { name, email, status, source, assignedTo } = parsed.data;

    let assignedUserId = assignedTo;
    if (req.user?.role === "Sales User") {
      assignedUserId = req.user.id;
    }

    const lead = await Lead.create({
      name,
      email,
      status: status || "New",
      source,
      assignedTo: assignedUserId,
    });

    res.status(201).json(lead);
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const { status, source, search, sort } = req.query;

    const query: Record<string, unknown> = {};

    if (status) query.status = status;
    if (source) query.source = source;
    if (search) {
      query.$or = [
        { name: { $regex: search as string, $options: "i" } },
        { email: { $regex: search as string, $options: "i" } },
      ];
    }

    // Role-based visibility:
    // If we want Sales User to only view their assigned leads, we add this. 
    // The prompt says "Sales User: View leads" (doesn't explicitly say only assigned, but it's safe to assume they can view all or assigned. Let's let them view all, but only edit assigned).
    
    let sortOption = -1; // latest
    if (sort === "oldest") sortOption = 1;

    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .sort({ createdAt: sortOption as any })
      .skip(skip)
      .limit(limit)
      .populate("assignedTo", "name email");

    res.json({
      data: leads,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getLeadById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id).populate("assignedTo", "name email");
    if (!lead) {
      res.status(404);
      throw new Error("Lead not found");
    }
    res.json(lead);
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      res.status(404);
      throw new Error("Lead not found");
    }

    if (req.user?.role === "Sales User") {
      if (lead.assignedTo?.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Not authorized to edit this lead");
      }
    }

    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLead);
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      res.status(404);
      throw new Error("Lead not found");
    }

    if (req.user?.role !== "Admin") {
      res.status(403);
      throw new Error("Only admins can delete leads");
    }

    await lead.deleteOne();
    res.json({ message: "Lead removed" });
  } catch (error) {
    next(error);
  }
};

export const exportLeadsCsv = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user?.role !== "Admin") {
      res.status(403);
      throw new Error("Only admins can export leads");
    }

    const leads = await Lead.find({}).populate("assignedTo", "name");
    
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=leads.csv");

    const headers = ["ID", "Name", "Email", "Status", "Source", "Assigned To", "Created At"];
    const rows = leads.map((lead: mongoose.Document & { name: string; email: string; status: string; source: string; createdAt: Date; assignedTo?: { name: string } }) => [
      lead._id,
      lead.name,
      lead.email,
      lead.status,
      lead.source,
      lead.assignedTo ? lead.assignedTo.name : "",
      lead.createdAt.toISOString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    res.send(csvContent);
  } catch (error) {
    next(error);
  }
};
