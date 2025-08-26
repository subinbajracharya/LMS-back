import express from "express"
import { auth } from "../middleware/authMiddleware.js"
import { getUserDetail } from "../controllers/userController.js"

const router = express.Router()

router.get("/detail", auth, getUserDetail)

export default router