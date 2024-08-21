import express from "express";
import verifyUser from "../middlewares/verifyUser";
import { verifyToken } from "../middlewares/verifyToken";
import {
  createProducts,
  deleteProduct,
  readAllProduct,
  readProduct,
  updateProduct,
} from "../controllers/products/products";

const productsRoutes = express.Router();

productsRoutes.post("/create", verifyToken, createProducts);
productsRoutes.put("/update/:id", verifyToken, updateProduct);
productsRoutes.delete("/delete/:id", verifyToken, deleteProduct);
productsRoutes.get("/read/:id", readProduct);
productsRoutes.get("/all", readAllProduct);

export default productsRoutes;
