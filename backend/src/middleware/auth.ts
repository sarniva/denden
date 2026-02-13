import type { Request, Response, NextFunction } from "express";
import { getAuth, requireAuth } from "@clerk/express";
import { User } from "../models/User";

export type AuthRequest = Request & {
  userId?: string;
};

export const protectRoute = [
  requireAuth(),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { userId: clerkId } = getAuth(req);
      if (!clerkId)
        return res.status(400).json({ message: "Unauthorized access" });
      const user = await User.findOne({ clerkId });

      if (!user) return res.status(404).json({ message: "User not found" });

      req.userId = user._id.toString();
      next();
    } catch (error) {
      console.log("Error in Protected Route", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
];
