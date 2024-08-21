import express from "express";
import cors from "cors";
import apiv1 from "./api/v1/routes/main";
import dotenv from "dotenv";
import { ConnectDb } from "./api/v1/utils/connectDb";
import cookieParser from 'cookie-parser'
dotenv.config();

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());

ConnectDb()
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`${res} and Started Listening on Port ${PORT}`);
    });
  })
  .catch((res) => {
    console.log(res.error);
  });
app.use("/api/v1", apiv1);
