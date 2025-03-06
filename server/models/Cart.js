import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  username: { type: String, required: true }, // ✅ Change from ObjectId to String
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
      },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1 },
      image: { type: String },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
