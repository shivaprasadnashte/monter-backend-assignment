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
    default: false,
  },
  location: {
    type: String,
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
