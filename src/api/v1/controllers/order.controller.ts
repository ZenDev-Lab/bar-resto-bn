import prisma from "../utils/connectDb";
import { verifyWaiter } from "../middlewares/checkUser";
import { newOrder } from "../services/order.service";
import { Request, Response } from "express";
import { verifyCashier } from "../middlewares/checkUser";
import { viewOrder } from "../services/order.service";
import { verifyGetOrder } from "../middlewares/checkUser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto"
dotenv.config();
export const createOrder = async (req: Request, res: Response) => {
  try {
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
    const userId = tokenData.userId

    const checkPermission: any = await verifyWaiter(tokenData);
    if (!checkPermission.allowed) {
      return res
        .status(403)
        .json({ message: "Only waiter is allowed to create an order" });
    }

    const { type, table, cashierId, items } = req.body;
    if (!type || !table || !cashierId || !items) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const cashier = await verifyCashier(cashierId);
    if (!cashier.allowed) {
      return res.status(404).json({ message: cashier.message });
    }
    const resetToken = crypto.randomInt(1000, 10000);

    const result = await newOrder(type, userId, table, cashierId, items, resetToken);

    res.status(201).json({ message: "Order placed successfully", result });
  } catch (error: any) {
    res.status(500).json({ Error: error.message });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
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
    const userId = tokenData.userId
    const checkPermission = await verifyGetOrder(userId);
    if (!checkPermission.allowed) {
      return res.status(403).json({ message: checkPermission.message });
    }
    const order = await viewOrder(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const user = await verifyGetOrder(userId);
    // if (user.user.role === "waiter") {
    //   if (user.user.userId === order.waiterId) {
    //     const result = await viewOrder(orderId);
    //     return res.status(200).json({ message: "Order found", result });
    //   } else {
    //     return res
    //       .status(403)
    //       .json({ message: `you are not allowed to view this` });
    //   }
    // }

    // if (user.user.role === "cashier") {
    //   if (user.user.userId === order.cashierId) {
    //     const result = await viewOrder(orderId);
    //     return res.status(200).json({ message: "Order found", result });
    //   } else {
    //     return res
    //       .status(403)
    //       .json({ message: `you are not allowed to view this` });
    //   }
    // }
    return res.status(200).json({ message: "Order found", order });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
