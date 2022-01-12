import express from 'express'
import { makeTransfer, getAllTransactions, getCreditTransactions, getDebitTransactions } from '../controllers/transactions.controllers'
import { protectRoute } from '../controllers/auth.controller'
const router = express.Router()


router.get('/transaction/:accountNumber', protectRoute, getAllTransactions)
router.get('/transaction/debit/:accountNumber', protectRoute, getDebitTransactions)
router.get('/transaction/credit/:accountNumber', protectRoute, getCreditTransactions)
router.post('/transfer', protectRoute, makeTransfer)


export default router