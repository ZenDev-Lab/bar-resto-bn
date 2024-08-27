import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET as string;

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(" ")[1];

 
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const { role } = decoded;


    // Allow admin to only create user
    if (role === "admin") {
      return next();
    }

    // Allow if the user is finance but block creating admin users
    if (role === "finance") {
      if (req.body.role === "admin" || req.body.role === "finance") {
        return res.status(403).json({
          success: false,
          message: "Sorry! You cannot create admin or finance",
        });
      }
      return next();
    }

    return res
      .status(403)
      .json({ success: false, message: "Unauthorized to create user" });
  });
};
