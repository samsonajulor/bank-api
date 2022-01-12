import mongoose from 'mongoose'
import validator from 'validator'

const UserSchema = new mongoose.Schema(
 {
  firstName: {
   type: String,
   required: [true, 'Please provide name'],
   maxlength: 50,
   minlength: 3,
  },
  lastName: {
   type: String,
   required: [true, 'Please provide name'],
   maxlength: 50,
   minlength: 3,
  },
  DOB: {
   type: String,
   required: [true, 'Please put in your date of birth'],
  },
  email: {
   type: String,
   required: [true, 'Please provide email'],
   validate: {
    validator: validator.isEmail,
    message: 'Please provide a valid email',
   },
   unique: true,
  },
  phoneNo: {
   type: String,
   required: [true, 'please provide your phone number'],
   minlength: 11,
   maxlength: 11
  },
  password: {
   type: String,
   required: [true, 'Please provide password'],
   minlength: 6,
  },
  token: {
      type: String,
    }
 }
)

export default mongoose.model('Users', UserSchema);