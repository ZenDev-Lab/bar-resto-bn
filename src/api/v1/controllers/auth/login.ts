import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET as string;
export default async (req: Request, res: Response) => {
  const { userId, role, email, profile } = req.body;
  try {
    const token = jwt.sign({ userId, role }, jwtSecret, {
      expiresIn: "1d",
    });
    res
      // .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json({ token, user: { email, profile } });
  } catch (error: any) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};
