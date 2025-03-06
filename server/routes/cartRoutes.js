import express from "express";
import Cart from "../models/Cart.js";
import mongoose from "mongoose";
const router = express.Router();

// ✅ Add to Cart Route
router.post("/", async (req, res) => {
  const { username, item } = req.body;
  try {
    if (!username || !item || !item.itemId || !item.image) {
      return res
        .status(400)
        .json({ error: "username, itemId, and image are required" });
    }

    let cart = await Cart.findOne({ username });

    if (!cart) {
      cart = new Cart({ username, items: [item] });
    } else {
      cart.items.push(item);
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", items: cart.items });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get Cart Items Route
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }
  try {
    const cart = await Cart.findOne({ username });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Server error" });
  }
});
export default router;
