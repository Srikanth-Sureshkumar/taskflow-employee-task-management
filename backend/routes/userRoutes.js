import express from "express";
import {
  updateProfile,
  changePassword,
  deleteAccount
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/profile", authMiddleware, updateProfile);
router.put("/password", authMiddleware, changePassword);
router.delete("/delete", authMiddleware, deleteAccount);

export default router;