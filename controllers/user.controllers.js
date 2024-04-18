import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendMail } from "../utills/sendMail.js";
import generateOTP from "../utills/generateOTP.js";

dotenv.config();

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = generateOTP();
    const user = new User({
      email,
      password: hashedPassword,
      otp: otp,
    });
    await user.save();
    await sendMail(email, otp);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyUser = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist Please regester first" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist Please regester first" });
    }
    const otp = generateOTP();
    user.otp = otp;
    await user.save();
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (!user.isVerified) {
      return res.status(400).json({ message: "User is not verified" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const token = await req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access Denied" });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (!user) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    const userData = await User.findById(user.id).select([
      "-password",
      "-otp",
      "-isVerified",
    ]);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.cookie =
      ("token",
      token,
      {
        httpOnly: true,
      });
    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addUserDetails = async (req, res) => {
  const { location, age, work } = req.body;
  if (!location || !age || !work) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access Denied" });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    const userData = await User.findOne(user.email);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    userData.location = location;
    userData.age = age;
    userData.work = work;
    await userData.save();
    res.status(200).json({ message: "User details added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
