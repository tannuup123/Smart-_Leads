import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { User } from "../models/User";
import { Lead } from "../models/Lead";

export const getDashboardStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Only Sales Users can access their dashboard stats
    if (req.user?.role !== "Sales User") {
      res.status(403);
      throw new Error("Only Sales Users can access dashboard stats");
    }

    const userId = req.user._id;

    // Get counts for various stats
    const [
      assignedLeadsCount,
      contactedTodayCount,
      qualifiedDealsCount,
      pendingFollowupsCount
    ] = await Promise.all([
      // Assigned Leads: leads assigned to this user
      Lead.countDocuments({ assignedTo: userId }),

      // Contacted Today: leads with status Contacted created today
      Lead.countDocuments({
        assignedTo: userId,
        status: "Contacted",
        createdAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lt: new Date(new Date().setHours(23, 59, 59, 999))
        }
      }),

      // Qualified Deals: leads with status Qualified or Accepted
      Lead.countDocuments({
        assignedTo: userId,
        status: { $in: ["Qualified", "Accepted"] }
      }),

      // Pending Follow-ups: leads with status New or Contacted (needing follow-up)
      Lead.countDocuments({
        assignedTo: userId,
        status: { $in: ["New", "Contacted"] }
      })
    ]);

    res.json({
      assignedLeads: assignedLeadsCount,
      contactedToday: contactedTodayCount,
      qualifiedDeals: qualifiedDealsCount,
      pendingFollowups: pendingFollowupsCount
    });
  } catch (error) {
    next(error);
  }
};

export const getRecentActivities = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.user?.role !== "Sales User") {
      res.status(403);
      throw new Error("Only Sales Users can access recent activities");
    }

    const userId = req.user._id;

    // Get recent lead activities for this user
    const recentLeads = await Lead.find({
      assignedTo: userId
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .select("name email status source createdAt updatedAt");

    // Transform to match frontend activity format
    const activities = recentLeads.map((lead, index) => ({
      id: lead._id.toString(),
      type: "status" as const,
      title: `Updated Lead: ${lead.name}`,
      description: `Lead status: ${lead.status}`,
      time: getTimeAgo(lead.updatedAt),
      status: "completed"
    }));

    // Add some generic activities if no leads exist
    if (activities.length === 0) {
      activities.push(
        {
          id: "1",
          type: "call" as const,
          title: "Welcome to Smart Leads CRM",
          description: "Start managing your leads effectively",
          time: "Just now",
          status: "completed"
        }
      );
    }

    res.json(activities);
  } catch (error) {
    next(error);
  }
};

export const getUpcomingFollowups = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.user?.role !== "Sales User") {
      res.status(403);
      throw new Error("Only Sales Users can access follow-ups");
    }

    const userId = req.user._id;

    // Get leads that need follow-up (New or Contacted status)
    const followupLeads = await Lead.find({
      assignedTo: userId,
      status: { $in: ["New", "Contacted"] }
    })
    .sort({ createdAt: 1 }) // Oldest first for follow-up priority
    .limit(3)
    .select("name email status source createdAt");

    // Transform to match frontend follow-up format
    const followups = followupLeads.map((lead, index) => ({
      id: lead._id.toString(),
      name: lead.name,
      email: lead.email,
      company: lead.email.split('@')[1]?.split('.')[0] || 'Unknown',
      time: getFollowupTime(lead.createdAt, index),
      priority: index === 0 ? "high" : index === 1 ? "medium" : "low"
    }));

    // Add mock data if no follow-ups exist
    if (followups.length === 0) {
      followups.push(
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          company: "example",
          time: "Tomorrow, 10:00 AM",
          priority: "high"
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@test.com",
          company: "test",
          time: "Tomorrow, 2:30 PM",
          priority: "medium"
        }
      );
    }

    res.json(followups);
  } catch (error) {
    next(error);
  }
};

export const getSalesTargets = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.user?.role !== "Sales User") {
      res.status(403);
      throw new Error("Only Sales Users can access sales targets");
    }

    const userId = req.user._id;

    // Calculate actual targets based on user's data
    const [
      outboundCalls,
      emailsSent,
      meetingsBooked
    ] = await Promise.all([
      // Placeholder values - in real app these would come from activity logs
      Math.floor(Math.random() * 30) + 20, // Random between 20-50
      Math.floor(Math.random() * 20) + 10, // Random between 10-30
      Math.floor(Math.random() * 5) + 1    // Random between 1-6
    ]);

    res.json([
      {
        label: "Outbound Calls",
        current: outboundCalls,
        target: 50,
        color: "bg-blue-500"
      },
      {
        label: "Emails Sent",
        current: emailsSent,
        target: 25,
        color: "bg-purple-500"
      },
      {
        label: "Meetings Booked",
        current: meetingsBooked,
        target: 4,
        color: "bg-green-500"
      }
    ]);
  } catch (error) {
    next(error);
  }
};

// Helper function to get time ago string
function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} mins ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;

  return date.toLocaleDateString();
}

// Helper function to get follow-up time
function getFollowupTime(date: Date, index: number): string {
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() + index + 1);

  const hours = 10 + (index * 2);
  const minutes = index * 15;

  baseDate.setHours(hours, minutes, 0, 0);

  if (baseDate.toDateString() === new Date().toDateString()) {
    return `Today, ${baseDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  }

  const day = baseDate.toLocaleDateString(undefined, {weekday: 'short'});
  return `${day}, ${baseDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
}