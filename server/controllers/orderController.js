import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// Place an order
export const placeOrder = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = new Order({
      userId,
      cartItems: cart.items,
      totalPrice,
    });

    await newOrder.save();
    await Cart.deleteOne({ userId });

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (Admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status (Admin)
export const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
