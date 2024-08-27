import express from "express";
import verifyUser from "../middlewares/verifyUser";
import loginUser from "../controllers/auth/loginUser";

const authRoute = express.Router();

authRoute.post("/login", verifyUser, loginUser);

export default authRoute;
