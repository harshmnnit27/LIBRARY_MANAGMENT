// checkAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/userModel.js";

dotenv.config();

const checkAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const user = await User.findOne({ email: "pandala.20233207@mnnit.ac.in" });
  if (user) {
    console.log("✅ Found user:", user.email);
    console.log("Role:", user.role);
    console.log("Password (hashed):", user.password);
  } else {
    console.log("❌ No user found with that email");
  }

  await mongoose.disconnect();
};

checkAdmin();
