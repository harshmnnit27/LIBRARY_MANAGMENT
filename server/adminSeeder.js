import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/userModel.js";
import bcrypt from "bcrypt";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "pandala.20233207@mnnit.ac.in";
    const password = "Govind@2004";
    const name = "Pandala Govind";
    const role = "Admin";

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log("ℹ️ Admin already exists:", existingAdmin.email);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const admin = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        accountVerified: true, // Must be true for login
      });

      console.log("✅ Admin created:", admin.email);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
