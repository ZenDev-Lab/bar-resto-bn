import prisma from "../utils/connectDb";
import { Request, Response } from "express";
import { newProduct } from "../services/product.service";
import { verifyStocker } from "../middlewares/checkUser";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await prisma.users.findUnique({
      where: { userId },
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    const checkPermission: any = await verifyStocker(user);
    if (!checkPermission?.allowed) {
      return res.status(403).json({ message: checkPermission.message });
    }
    if(checkPermission.allowed) {
        console.log('--> This is stocker for sure')
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
    if (result) res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const hello = (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World" });
};
