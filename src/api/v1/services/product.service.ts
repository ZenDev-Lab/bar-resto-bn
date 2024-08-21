import { PrismaClient } from "@prisma/client";
import prisma from "../utils/connectDb";

type Category = "food" | "beverage" | "cleaning" | "utensil";

export const newProduct = async (
  name: string,
  expirationDate: string,
  entiryDate: any,
  category: Category,
  price: string,
  supplier: string,
  quantity: string,
  stockerId: string
) => {
  
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

  return product;
};
