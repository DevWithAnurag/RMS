import express from "express";
import {
  placeOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", placeOrder);
router.get("/", getOrders);
router.put("/update", updateOrderStatus);

export default router;
