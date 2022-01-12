import express from 'express'
import {getAllBalance, getUserBalance, getAccountBalance} from '../controllers/balances.controllers'
import { protectRoute } from '../controllers/auth.controller'
const router = express.Router()


router.get('/balance', protectRoute, getAllBalance)
router.get('/balance/user/:userId', protectRoute, getUserBalance)
router.get('/balance/account/:accountNumber', getAccountBalance)


export default router