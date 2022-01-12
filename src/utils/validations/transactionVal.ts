import { ITransaction } from "../interfaces/interface"
import Joi from 'joi'

export const validateTransaction = (data: ITransaction) => {
 const schema = Joi.object({
  reference: Joi.string().required(),
  amount: Joi.string().required(),
  receiverAccount: Joi.date().required(),
  createdAt: Joi.string().email().required(),
  senderAccount: Joi.number().required(),
  transferDescription: Joi.string().required()
 })
 return schema.validate(data)
}
