import express from "express";
import login from "../controllers/auth/login";

const authRoute = express.Router();

authRoute.post("/login", login);

export default authRoute;
