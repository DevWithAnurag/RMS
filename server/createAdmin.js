import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";

connectDB();

const createAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: "admin@example.com" });

    if (adminExists) {
      console.log("⚠️ Admin already exists!");
      process.exit(1);
    }

    const admin = new Admin({
      email: "admin@example.com",
      password: "admin123",
    });

    await admin.save();
    console.log("✅ Admin user created successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();
