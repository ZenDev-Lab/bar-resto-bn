import express from "express";
import welcome from "../controllers/welcome/welcome";
import authRoute from "./auth";
import swaggerRoute from "./swagger";

const apiv1 = express.Router();
apiv1.get("/", welcome);
apiv1.use("/auth", authRoute);
apiv1.use("/docs", swaggerRoute);
export default apiv1;
