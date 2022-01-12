import express from 'express'
import { signup, login } from '../controllers/users.controller'
import { protectRoute } from '../controllers/auth.controller'
const router = express.Router()

router.post('/transfer-service/login', login)
router.post('/transfer-service/signup', signup)

export default router;
