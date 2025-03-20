// import express from "express";
// const router = express.Router();
// import Razorpay from "razorpay";
// // import razorpayInstance from "razorpay";

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET_KEY,
// });

// router.post("/create-order", async (req, res) => {
//   try {
//     const { amount, currency, receipt, notes } = req.body;

//     if (!amount || !currency || !receipt) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const options = {
//       amount,
//       currency,
//       receipt,
//       notes,
//     };

//     const order = await razorpayInstance.orders.create(options);

//     res.status(200).json(order);
//   } catch (error) {
//     console.error("Error while creating Razorpay order:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// });

// export default router;
import express from "express";
import Razorpay from "razorpay";
import Receipt from "../models/receiptModel.js";
import dotenv from "dotenv";
import crypto from "crypto";

const router = express.Router();
dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;
    if (!amount || !currency || !receipt) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const options = {
      amount,
      currency,
      receipt,
      notes,
      payment_capture: 1,
    };

    const order = await razorpayInstance.orders.create(options);

    // Save receipt to the database
    await Receipt.create({
      orderId: order.id,
      paymentId: "", // You can update this post-payment
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Error while creating Razorpay order:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Verify Payment Route
router.post("/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    // Update the receipt with payment ID
    await Receipt.findOneAndUpdate(
      { orderId: razorpay_order_id },
      { paymentId: razorpay_payment_id }
    );

    res.status(200).json({ message: "Payment Verified Successfully" });
  } else {
    res.status(400).json({ message: "Payment Verification Failed" });
  }
});

export default router;
