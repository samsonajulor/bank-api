import express from 'express'
import { makeTransfer, getAllTransactions, getCreditTransactions, getDebitTransactions } from '../controllers/transactions.controllers'
import { protectRoute } from '../controllers/auth.controller'
const router = express.Router()


router.get('/transfer-service/transaction/:accountNumber', protectRoute, getAllTransactions)
router.get('/transfer-service/transaction/debit/:accountNumber', protectRoute, getDebitTransactions)
router.get('/transfer-service/transaction/credit/:accountNumber', protectRoute, getCreditTransactions)
router.post('/transfer-service/transfer', protectRoute, makeTransfer)


export default router