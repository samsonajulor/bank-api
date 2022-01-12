import Balance from '../models/balances.models'
import {Request, Response} from 'express'
import APIFeatures from '../utils/apiFeatures'

// gets all accounts and their balance
export const getAllBalance = async (req: Request, res: Response) => {
 try {
//pagination query
  const features = new APIFeatures(Balance.find(), req.query)
   .paginate();
  const balance = await features.query;
  res.status(200).json({
   message: "successful",
   balance
  })
 } catch (err) {
  console.log(err)
  res.status(400).send('Not Found')
 }
}

//get balance for a particular account
export const getAccountBalance = async (req: Request, res: Response) => {
 try {
  const {accountNumber} = req.params
  const accountBalance = await Balance.findOne({accountNo: accountNumber})
  if (!accountBalance) res.status(401).json({ error: 'no such account' })
  else res.status(200).json({ message: 'successful', accountBalance })
 } catch (err: any) {
  console.log(err)
  res.status(400).json(err.message)
 }
}

// get balance for a particular user
export const getUserBalance = async (req: Request, res: Response) => {
 try {
  const { userId } = req.params
  const accountBalance = await Balance.findOne({ _id: userId })
  console.log('userId', userId)
  if(!accountBalance) res.status(401).json({error: 'no such user'})
  else {
   res.status(200).json({ message: 'successful', accountBalance })
  }
 } catch (err) {
  console.log(err)
  res.status(400).send('Not Found')
 }
}