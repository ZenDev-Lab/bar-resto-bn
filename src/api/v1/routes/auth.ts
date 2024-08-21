import express from "express";
import login from "../controllers/auth/login";
import { register } from "../controllers/auth/register";
import { isAdmin } from "../middlewares/isAdmin";
import verifyUser from "../middlewares/verifyUser";

const authRoute = express.Router();

authRoute.post("/login",verifyUser,login);
authRoute.post("/register",register);

export default authRoute;
