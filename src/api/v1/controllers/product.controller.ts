import prisma from "../utils/connectDb";
import { Request, Response } from "express";
import { newProduct } from "../services/product.service";
import { verifyStocker } from "../middlewares/checkUser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const createProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }
    let tokenData;
    try {
      tokenData = jwt.verify(token, `${process.env.JWT_SECRET}`) as any; 
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user = await prisma.users.findUnique({
      where: { userId },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    const checkPermission = await verifyStocker(tokenData);
    if (!checkPermission?.allowed) {
      return res.status(403).json({ message: checkPermission.message });
    }

    const { name, expirationDate, category, price, supplier, quantity } =
      req.body;
    if (!name || !category || !price || !supplier || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const result = await newProduct(
      name,
      expirationDate,
      new Date(),
      category,
      price,
      supplier,
      quantity,
      userId
    );

    if (result) {
      return res.status(201).json(result);
    } else {
      return res.status(500).json({ message: "Failed to create product" });
    }
  } catch (error: any) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: error.message });
  }
};

export const hello = (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World" });
};
