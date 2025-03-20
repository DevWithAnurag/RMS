import Razorpay from "razorpay";
import crypto from "crypto";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
export const createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;

    const options = {
      amount: amount * 100,
      currency,
      receipt: `receipt_${Date.now()}`,
      notes,
    };

    const order = await Razorpay.orders.create(options);
    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      notes: order.notes,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Error creating Razorpay order" });
  }
};

// Verify Payment
export const verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature === expectedSignature) {
    res.status(200).json({ message: "Payment Verified Successfully" });
  } else {
    res.status(400).json({ message: "Invalid Signature" });
  }
};
