import  express from "express";
import { createProduct } from "../controllers/product.controller";
import { hello } from "../controllers/product.controller";

const productRoute = express.Router()

productRoute.post('/create-product/:id', createProduct)
productRoute.get('/hello', hello)

export default productRoute
