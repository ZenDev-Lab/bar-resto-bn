import express from "express";
import { createMenuItem, getMenuItems, updateMenuItem, deleteMenuItem } from "../controllers/menuController";

const router = express.Router();

router.post("/", createMenuItem);       
router.get("/", getMenuItems);         
router.put("/:itemId", updateMenuItem); 
router.delete("/:itemId", deleteMenuItem); 

export default router;
