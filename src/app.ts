import express from "express";
import cors from "cors";
import apiv1 from "./api/v1/routes/main";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
app.use("/api/v1", apiv1);
