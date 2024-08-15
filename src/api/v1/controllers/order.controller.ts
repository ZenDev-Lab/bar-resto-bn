import prisma from "../utils/connectDb";
import { verifyWaiter } from "../middlewares/checkUser";
import { newOrder } from "../services/order.service";
import { Request, Response } from "express";
import { verifyCashier } from "../middlewares/checkUser";
import { viewOrder } from "../services/order.service";
import { verifyGetOrder } from "../middlewares/checkUser";
export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await prisma.users.findUnique({
      where: { userId },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const checkPermission: any = await verifyWaiter(user);
    if (!checkPermission.allowed) {
      return res
        .status(403)
        .json({ message: "You are not allowed to create an order" });
    }

    const { type, table, cashierId, items } = req.body;
    if (!type || !table || !cashierId || !items) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const cashier = await verifyCashier(cashierId);
    if (!cashier.allowed) {
      return res.status(404).json({ message: cashier.message });
    }
    const result = await newOrder(type, userId, table, cashierId, items);

    res.status(201).json({ message: "Order placed successfully", result });
  } catch (error: any) {
    res.status(500).json({ Error: error.message });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const userId = req.params.userId;
    const checkPermission = await verifyGetOrder(userId);
    if (!checkPermission.allowed) {
      return res.status(403).json({ message: checkPermission.message });
    }
    const order = await viewOrder(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const user = await verifyGetOrder(userId);
    if (user.user.role === "waiter") {
      if (user.user.userId === order.waiterId) {
        const result = await viewOrder(orderId);
        return res.status(200).json({ message: "Order found", result });
      } else {
        return res
          .status(403)
          .json({ message: `you are not allowed to view this` });
      }
    }

    if (user.user.role === "cashier") {
      if (user.user.userId === order.cashierId) {
        const result = await viewOrder(orderId);
        return res.status(200).json({ message: "Order found", result });
      } else {
        return res
          .status(403)
          .json({ message: `you are not allowed to view this` });
      }
    }
    return res.status(200).json({ message: "Order found", order });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
