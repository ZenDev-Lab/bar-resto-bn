import express from "express";
import welcome from "../controllers/welcome/welcome";
import authRoute from "./auth";
import swaggerRoute from "./swagger";
import productRoute from "./product";
import ordersRoute from "./orders";

const apiv1 = express.Router();
apiv1.get("/", welcome);
apiv1.use("/auth", authRoute);
apiv1.use("/products", productRoute)
apiv1.use("/docs", swaggerRoute);
apiv1.use("/orders", ordersRoute);
export default apiv1;
