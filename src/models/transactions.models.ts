import mongoose from 'mongoose'
const TransactionSchema = new mongoose.Schema(
 {
  reference: {
   type: String,
  },
  amount: {
   type: Number,
   required: [true, 'Please put in the required amount']
  },
  receiverAccount: {
   type: String,
   required: [true, 'Please put in receipient account details'],
  },
  senderAccount: {
   type: String,
   required: [true, 'Please put in your account details'],
  },
  createdAt: {
   type: Date,
  },
  transferDescription: {
   type: String,
   required: [true, 'description required']
  },
 },
)

export default mongoose.model('Transaction', TransactionSchema);