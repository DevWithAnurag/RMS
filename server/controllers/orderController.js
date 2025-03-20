import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// 📦 Place an Order
export const placeOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.findOne({ userId }).populate("items.menuItem");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (acc, item) => acc + item.menuItem.price * item.quantity,
      0
    );

    const order = new Order({
      userId,
      items: cart.items,
      totalAmount,
    });

    await order.save();

    // Clear the cart after placing the order
    await Cart.findOneAndDelete({ userId });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};

// 🛍 Fetch User's Orders
export const getOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ userId }).populate("items.menuItem");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};
