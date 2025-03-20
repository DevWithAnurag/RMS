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

// Delete item from cart
router.delete("/:username/:itemId", async (req, res) => {
  try {
    const { username, itemId } = req.params;
    const cart = await Cart.findOne({ username });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.itemId.toString() !== itemId);
    await cart.save();

    res.json({ message: "Item removed from cart", items: cart.items });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item from cart" });
  }
});

export default router;
