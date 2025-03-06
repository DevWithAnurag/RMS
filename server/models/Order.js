import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
      },
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  orderedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
