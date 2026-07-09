import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";

dotenv.config();

const deleteAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const result = await User.deleteOne({ email: "pandala.20233207@mnnit.ac.in" });
    console.log("🗑 Admin deletion result:", result);

    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error deleting admin:", error.message);
  }
};

deleteAdmin();
