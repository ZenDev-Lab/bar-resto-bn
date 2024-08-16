import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const { name, price, quantity } = req.body;
    const menuItem = await prisma.menu.create({
      data: {
        name,
        price,
        quantity,
      },
    });
    return res.status(201).json({ message: "Menu item created successfully", menuItem });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const getMenuItems = async (req: Request, res: Response) => {
    try {
      const menuItems = await prisma.menu.findMany();
      return res.status(200).json(menuItems);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };
  export const updateMenuItem = async (req: Request, res: Response) => {
    try {
      const { itemId } = req.params;
      const { name, price, quantity } = req.body;
      const menuItem = await prisma.menu.update({
        where: { itemId },
        data: { name, price, quantity },
      });
      return res.status(200).json({ message: "Menu item updated successfully", menuItem });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };
  export const deleteMenuItem = async (req: Request, res: Response) => {
    try {
      const { itemId } = req.params;
      await prisma.menu.delete({ where: { itemId } });
      return res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  


  
   