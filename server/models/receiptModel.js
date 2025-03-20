import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  amount: Number,
  currency: String,
  receipt: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Receipt", receiptSchema);
