import User from '../models/users.models'
import Balance from '../models/balances.models'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const signup = async (req: Request, res: Response) => {
  try {
    let { firstName, lastName, DOB, phoneNo, email, password } = req.body
    const emailAlreadyExists = await User.findOne({ email })
    if (!(firstName && password && email && DOB && lastName && phoneNo)) {
      res.status(400).send('all fields are required')
    }
    if (emailAlreadyExists) {
      res.status(409).send({ error: 'email already exists' })
    }

    password = await bcrypt.hash(password, 10)
    //create the user
    const user = await User.create({ firstName, lastName, DOB, phoneNo, email, password })
    user.token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN
    })

    //create account number
    let accountNo = '0000000001'
    let balance = '5000'
    let createdAt = new Date()
    let userId = user._id
    const lastUser = await Balance.find().sort({ _id: -1 }).limit(1)
    if (lastUser.length === 0) {
      await Balance.create({ accountNo: accountNo, userId, balance, createdAt })
    } else {
      const newAcctNo = parseInt(lastUser[0].accountNo) + 1
      const lengthOfNewAcctNo = newAcctNo.toString().length
      const prefix = '0'.repeat(10 - lengthOfNewAcctNo)
      accountNo = prefix + newAcctNo
      await Balance.create({ accountNo: accountNo, userId, balance, createdAt })
    }
//end create account number

    //sending full details because it is a test
    res.status(201).json({ message: 'success! You have received a balance of 5000NGN', userDetails: user, accountBalance: {accountNo, balance, createdAt, userId} })
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}



export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).send({ error: 'please provide email and password' })
    }
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ error: 'email is not correct' })
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).json({ error: 'password is not correct' })
    }

    user.token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN
    })
    //sending full details because it is a test
    res.status(201).json({ message: 'login successful', user })
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}
