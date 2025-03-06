import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router(); // ✅ Correct way to define a router

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    // If user doesn't exist, create a new one
    if (!user) {
      console.log("User not found! Creating a new account...");

      // Generate a unique username based on email
      const username =
        email.split("@")[0] + Math.floor(1000 + Math.random() * 9000);

      // Hash password before storing
      const hashedPassword = await bcrypt.hash(password, 10);

      user = new User({
        email,
        password: hashedPassword,
        username, // Store generated username
      });

      await user.save();
      console.log("New user created:", user);
    } else {
      // If user exists, check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Invalid password!");
        return res.status(400).json({ error: "Invalid credentials" });
      }
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router; // ✅ Correct way to export in ES Modules
