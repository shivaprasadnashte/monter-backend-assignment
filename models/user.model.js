import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
