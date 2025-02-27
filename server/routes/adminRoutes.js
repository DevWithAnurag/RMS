import express from "express";
import { adminLogin, registerAdmin } from "../controllers/adminController.js";
import protectAdmin from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/dashboard", protectAdmin, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard", admin: req.admin });
});
router.post("/login", adminLogin);
router.post("/register", registerAdmin);
export default router;
