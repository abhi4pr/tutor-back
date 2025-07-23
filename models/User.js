import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profile_pic: {
      type: String,
      required: false,
      default: "",
    },
    phone: {
      type: String,
      required: false,
      default: 0,
    },
    address: {
      type: String,
      required: false,
      default: "",
    },
    role: {
      type: String,
      required: true,
      enum: ["Student", "Teacher"],
      default: "Student",
    },
    verified: {
      type: Boolean,
      required: false,
      default: false,
    },
    intro: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
