import express from 'express'
import {getAllBalance, getUserBalance, getAccountBalance} from '../controllers/balances.controllers'
import { protectRoute } from '../controllers/auth.controller'
const router = express.Router()


router.get('/transfer-service/balance', protectRoute, getAllBalance)
router.get('/transfer-service/balance/user/:userId', protectRoute, getUserBalance)
router.get('/transfer-service/balance/account/:accountNumber', getAccountBalance)


export default router