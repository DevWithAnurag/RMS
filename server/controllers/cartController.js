import Cart from "../models/Cart";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { username, productId, name, price, image, quantity } = req.body;
    let cart = await Cart.findOne({ username });

    if (!cart) {
      cart = new Cart({ username, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, image, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get user cart
export const getCart = async (req, res) => {
  try {
    const { username } = req.params;
    const cart = await Cart.findOne({ username });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
