import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { Lead } from "../models/Lead";

export const getAnalyticsStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Only Sales Users can access analytics
    if (req.user?.role !== "Sales User") {
      res.status(403);
      throw new Error("Only Sales Users can access analytics");
    }

    const userId = req.user._id;

    // Get leads for this user
    const leads = await Lead.find({ assignedTo: userId });

    const total = leads.length;
    const qualified = leads.filter(l => l.status === 'Qualified').length;
    const lost = leads.filter(l => l.status === 'Lost').length;
    const revenue = leads.filter(l => l.status === 'Qualified').reduce((sum, lead) => sum + (lead.value || 0), 0);
    const convRate = total > 0 ? ((qualified / total) * 100).toFixed(1) : '0';

    // Mock deltas since we don't have historical data yet
    const stats = {
      totalLeads: total,
      qualifiedLeads: qualified,
      lostLeads: lost,
      monthlyRevenue: revenue,
      conversionRate: parseFloat(convRate),
      deltas: {
        totalLeads: '+12%',
        qualifiedLeads: '+8%',
        lostLeads: '-2%',
        monthlyRevenue: '+18%',
        conversionRate: '+3.1%'
      }
    };

    res.json(stats);
  } catch (error) {
    next(error);
  }
};

export const getMonthlyData = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.user?.role !== "Sales User") {
      res.status(403);
      throw new Error("Only Sales Users can access monthly data");
    }

    const userId = req.user._id;

    // Get leads for this user with createdAt dates
    const leads = await Lead.find({ assignedTo: userId });

    // Group by month (simplified - using createdAt month)
    const monthlyMap: Record<string, { leads: number, qualified: number, revenue: number }> = {};

    leads.forEach(lead => {
      const date = new Date(lead.createdAt);
      const monthKey = date.toLocaleString('default', { month: 'short' }); // Jan, Feb, etc.

      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = { leads: 0, qualified: 0, revenue: 0 };
      }

      monthlyMap[monthKey].leads += 1;
      if (lead.status === 'Qualified') {
        monthlyMap[monthKey].qualified += 1;
        monthlyMap[monthKey].revenue += (lead.value || 0);
      }
    });

    // Convert to array and sort by month order
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = monthOrder
      .filter(month => monthlyMap[month])
      .map(month => ({
        month,
        leads: monthlyMap[month].leads,
        qualified: monthlyMap[month].qualified,
        revenue: monthlyMap[month].revenue
      }));

    // If no data, return empty array
    res.json(monthlyData);
  } catch (error) {
    next(error);
  }
};

export const getSourceData = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.user?.role !== "Sales User") {
      res.status(403);
      throw new Error("Only Sales Users can access source data");
    }

    const userId = req.user._id;

    // Get leads for this user
    const leads = await Lead.find({ assignedTo: userId });

    // Count by source
    const sourceMap: Record<string, number> = {};
    leads.forEach(lead => {
      const source = lead.source || 'Unknown';
      sourceMap[source] = (sourceMap[source] || 0) + 1;
    });

    // Convert to array format expected by frontend
    const sourceData = Object.entries(sourceMap)
      .map(([name, value]) => ({ name, value }));

    res.json(sourceData);
  } catch (error) {
    next(error);
  }
};