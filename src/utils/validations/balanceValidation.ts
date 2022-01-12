import { IBalance } from "../interfaces/interface"
import Joi from 'joi'

export const validateBalance = (data: IBalance) => {
 const schema = Joi.object({
  accountNo: Joi.string().required(),
  balance: Joi.number().required(),
  createdAt: Joi.date().required(),
  email: Joi.string().email().required(),
  updatedAt: Joi.date().required(),
  userId: Joi.string().required()
 })
 return schema.validate(data)
}