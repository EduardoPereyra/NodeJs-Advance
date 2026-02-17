import type { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/index.js";
import { UserModel } from "../../data/mongodb/index.js";

export class AuthMiddleware {
  static validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const authHeader = req.header("Authorization");

    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });
    if (!authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "Invalid token format" });

    const token = authHeader.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.verifyToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ message: "Invalid token" });

      const user = await UserModel.findById(payload.id);
      if (!user) return res.status(500).json({ message: "User not found" });

      req.body = user;
      next();
    } catch (error) {
      console.error("Error validating JWT:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
