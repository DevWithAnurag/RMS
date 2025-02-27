import express from "express";
import {
  addMenuItem,
  getMenuItems,
  deleteMenuItem,
} from "../controllers/menuController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Protect admin route if needed

const router = express.Router();

// Admin route to add menu item
router.post("/add", addMenuItem);

// Admin: delete a menu item (protected)
router.delete("/:id", authMiddleware, deleteMenuItem);

// Public route to get menu items
router.get("/", getMenuItems);

export default router;
