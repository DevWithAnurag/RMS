import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  const { amount, currency, receipt, notes } = req.body;

  if (!amount || !currency || !receipt) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const options = {
      amount,
      currency,
      receipt,
      notes,
    };

    const order = await razorpay.orders.create(options);
    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
