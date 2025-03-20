import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import adminRoutes from "./routes/adminRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";

import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import orderRoutes from "./routes/orderRoutes.js";

import paymentRoutes from "./routes/paymentRoutes.js";
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoutes);

app.use("/api/menu", menuRoutes);

app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
