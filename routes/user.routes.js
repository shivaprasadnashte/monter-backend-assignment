import express from "express";
import {
  registerUser,
  verifyUser,
  resendOTP,
  loginUser,
  getUser,
  addUserDetails,
} from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify", verifyUser);
userRouter.post("/resendotp", resendOTP);
userRouter.post("/login", loginUser);
userRouter.get("/getuser", getUser);
userRouter.post("/adddetails", addUserDetails);

export default userRouter;
