import express from 'express'
import { signup, login } from '../controllers/users.controller'
import { protectRoute } from '../controllers/auth.controller'
const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)

export default router;
