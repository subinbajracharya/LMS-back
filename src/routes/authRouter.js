import express from "express"
import { loginUser, registerUser, verifyEmail } from "../controllers/authController.js"

const router = express.Router()

// Register api
router.post("/register", registerUser)

// Login api
router.post("/login", loginUser)

// Verify email api
router.post("/verify-email", verifyEmail)

export default router