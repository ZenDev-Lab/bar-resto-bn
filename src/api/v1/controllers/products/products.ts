import { Request, Response } from "express";
import prisma from "../../utils/connectDb";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";

export const createProducts = async (req: Request, res: Response) => {
  try {
    const {
      name,
      expirationDate,
      entiryDate,
      category,
      price,
      supplier,
      quantity,
    } = req.body;
    const stockerId = (req as any).token.userId;
    const stocker = await prisma.users.findUnique({
      where: { userId: stockerId },
    });

    if (!stocker) {
      return res.status(404).json({
        error: "User Not Found",
        message: "Stocker not found",
      });
    }

    if (stocker.role !== "stocker") {
      return res.status(403).json({
        error: "Forbidden",
        message: "Only stockers can create products",
      });
    }
    const product = await prisma.products.create({
      data: {
        name,
        expirationDate,
        entiryDate,
        category,
        price,
        supplier,
        quantity,
        stockerId,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const stockerId = (req as any).token.userId;
    const productId = req.params.id;
    const updatedData = req.body;
    const stocker = await prisma.users.findUnique({
      where: { userId: stockerId },
    });

    if (!stocker) {
      return res.status(404).json({
        error: "User Not Found",
        message: "Stocker not found",
      });
    }

    if (stocker.role !== "stocker") {
      return res.status(403).json({
        error: "Forbidden",
        message: "Only stockers can create products",
      });
    }
    if (!productId) {
      return res.status(404).json({ message: "Ooops The Product Not Found" });
    }
    const product = await prisma.products.update({
      where: { productId },
      data: updatedData,
    });
    res.status(200).json({ mesaage: "Products Updated Successfully", product });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const stockerId = (req as any).token.userId;
    const productId = req.params.id;
    const stocker = await prisma.users.findUnique({
      where: { userId: stockerId },
    });
    if (!stocker) {
      return res.status(404).json({ message: "User Not Found" });
    }
    if (stocker.role !== "stocker") {
      return res.status(403).json({ message: "Forbidden" });
    }
    if (!productId) {
      return res.status(404).json({ message: "Ooops The Product Not Found" });
    }
    await prisma.products.delete({ where: { productId } });
    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (error) {}
};

export const readProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await prisma.products.findUnique({ where: { productId } });
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const readAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await prisma.products.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};
