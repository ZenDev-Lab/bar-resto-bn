import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET as string;
export default async (req: Request, res: Response) => {
  const { userId, role, username, profile } = req.body;
  try {
    const token = jwt.sign({ userId, role }, jwtSecret, {
      expiresIn: "1d",
    });
    res.json({ token, user: { username, profile } });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
