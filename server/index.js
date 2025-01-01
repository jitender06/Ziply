import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet, { crossOriginResourcePolicy } from "helmet";
import connectDB from "./config/ConnectDb.js";
dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
const PORT = 8080 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("app is running", PORT);
  });
});
