import express from "express";
import cors from "cors";
import apiv1 from "./api/v1/routes/main";
import dotenv from "dotenv";
import { ConnectDb } from "./api/v1/utils/connectDb";
import menuRoute from "./api/v1/routes/menuRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

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
app.use("/menu", menuRoute);