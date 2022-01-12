import mongoose from 'mongoose'
const BalanceSchema = new mongoose.Schema(
 {
  accountNo: {//ten unique digits
   type: String,
   required: [true, 'Please put in your account details'],
   maxlength: 10,
   minlength: 10
  },
  balance: {
   type: String
  },
  createdAt: {
   type: Date
  },
  updatedAt: {
   type: Date,
  },
  userId: {
   type: String
  },
 },
)

export default mongoose.model('Balance', BalanceSchema)

