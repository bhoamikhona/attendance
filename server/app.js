import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import allRoutes from "./routes/routes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    withCredentials: true,
  })
);

app.get("/", (req, res) => res.send("Working"));

app.use("/api/v1", allRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.listen(8000, () => console.log("App started listening on port 8000"));
