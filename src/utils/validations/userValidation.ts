import { IUser } from "../interfaces/interface";
import Joi from 'joi'


export const validateUser = (data:IUser) => {
 const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  DOB: Joi.date().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.number().required(),
  password: Joi.string().required()
 })
 return schema.validate(data)
}