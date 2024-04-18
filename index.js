import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utills/db.js";
import userRouter from "./routes/user.routes.js";
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectDB();

app.get("/",(req,res)=>{

  res.sendFile(path.join(__dirname,"/public/index.html"))
})
app.use("/api/users",userRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
