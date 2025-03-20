import express from "express";
import { placeOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", placeOrder);
router.post("/", getOrders);

export default router;
