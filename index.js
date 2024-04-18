import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utills/db.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

connectDB();

app.use("/api/users",userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
