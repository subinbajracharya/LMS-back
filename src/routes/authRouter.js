import express from "express"
import { loginUser, registerUser, verifyEmail } from "../controllers/authController.js"
import { createAccessToken } from "../utils/jwt.js"

const router = express.Router()

// Register api
router.post("/register", registerUser)

// Login api
router.post("/login", loginUser)

// Verify email api
router.post("/verify-email", verifyEmail)

router.get("/refresh-token", (req, res) => {
    let payload = {
        email: req.user.email,
    };

    let accessToken = createAccessToken(payload)
    return res.send({
        status: "success",
        message: "New refresh token generated",
        accessToken,
    });
})

export default router