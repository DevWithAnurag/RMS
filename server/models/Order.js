import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  items: [
    {
      itemId: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    default: "Pending",
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
