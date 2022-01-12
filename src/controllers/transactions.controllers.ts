import Transaction from '../models/transactions.models'
import Balance from '../models/balances.models'
import {Request, Response} from 'express'
import uniqid from 'uniqid'
import APIFeatures from '../utils/apiFeatures'

export const makeTransfer = async (req: Request, res: Response) => {
  try{
    const {senderAccount, receiverAccount, amount, transferDescription} = req.body
    const createdAt = new Date()
    const reference = `${senderAccount}-${uniqid()}-${receiverAccount}`

    const getSenderAccount = await Balance.findOne({accountNo: senderAccount})
    const getReceiverAccount = await Balance.findOne({accountNo: receiverAccount})
    if (!getSenderAccount) res.status(409).json({ error: 'sender account not found' })
    if (!getReceiverAccount) res.status(409).json({ error: 'receiver account not found' })

    if(senderAccount !== getSenderAccount.accountNo) res.status(409).json({error: 'invalid sender account details'})
    if(receiverAccount !== getReceiverAccount.accountNo) res.status(409).json({error: 'invalid receiver account details'})
    if (receiverAccount === getReceiverAccount.accountNo && senderAccount === getSenderAccount.accountNo) {

      let senderBalance = Number(getSenderAccount.balance)
      let receiverBalance = Number(getReceiverAccount.balance)

      if (senderBalance<Number(amount)) res.status(409).json({message: 'insufficient funds'})
      else if (senderBalance>Number(amount)) {
        receiverBalance += Number(amount)
        senderBalance -= Number(amount)

        const updateSenderAccount = await Balance.findOneAndUpdate({accountNo: senderAccount}, {balance: senderBalance.toString(), updatedAt: createdAt})
        const updateReceiverAccount = await Balance.findOneAndUpdate({accountNo: receiverAccount}, {balance: receiverBalance.toString(), updatedAt: createdAt})

        const newTransaction = await Transaction.create({ reference, senderAccount, receiverAccount, transferDescription, amount, createdAt })
        res.status(200).json({ message: 'successful', newTransaction, sender: updateSenderAccount, recepient: updateReceiverAccount })
      }
    }
  } catch (err: any){
   res.status(400).send(err.message)
  }
}

export const getAllTransactions = async (req: Request, res: Response) => {
 try {
   const features = new APIFeatures(Transaction.find(), req.query)
     .paginate();
   const transferFeature = await features.query;
   res.status(200).json({
     message: "successful",
     transferFeature
   })

  
   const {accountNumber} = req.params
  const data = await Transaction.find()
  const transactions = data.filter(transfers=> {
    return transfers.receiverAccount === accountNumber || transfers.senderAccount === accountNumber
  })
  res.status(200).json({message: 'successful', transactions})
 } catch (err: any) {
  res.status(400).send(err.message)
 }
}

export const getCreditTransactions = async (req: Request, res: Response) => {
 try {
   const { accountNumber } = req.params
   const data = await Transaction.find()
   const transactions = data.filter(transfers => {
     return transfers.receiverAccount === accountNumber
   })
   res.status(200).json({ message: 'successful', transactions })
 } catch (err) {
  res.status(400).send('not found')
 }
}

export const getDebitTransactions = async (req: Request, res: Response) => {
 try {
   const { accountNumber } = req.params
   const data = await Transaction.find()
   const transactions = data.filter(transfers => {
     return transfers.senderAccount === accountNumber
   })
   res.status(200).json({ message: 'successful', transactions })
 } catch (err) {
  res.status(400).send('not found')
 }
}