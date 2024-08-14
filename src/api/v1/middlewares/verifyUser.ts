import { Response, Request, NextFunction } from "express";
import prisma from "../utils/connectDb";
import bcrypt from "bcrypt";

export default async function verifyUser(
  req: Request,
  res: Response,
  nextFn: NextFunction
) {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(401).json({
        error: "Required data",
        message: "username and password are required",
      });
    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });
    if (!user)
      return res.status(401).json({
        error: "Invalid Credentials",
        message: "Enter Correct Username or Password",
      });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid Credentials",
        message: "Enter Correct Username or Password",
      });
    }
    req.body.userId = user.userId;
    req.body.profile = user.profile;
    req.body.role = user.role;

    nextFn();
  } catch (error: any) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
}
