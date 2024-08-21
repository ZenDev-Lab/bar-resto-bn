import { createOrder } from "../controllers/order.controller";
import { getOrder } from "../controllers/order.controller";
import express from "express"
import verifyUser from "../middlewares/verifyUser";

const ordersRoute = express.Router()

ordersRoute.post('/create-order/:id', createOrder)
ordersRoute.get('/:userId/:orderId', getOrder)

export default ordersRoute