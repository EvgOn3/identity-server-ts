import { IUser } from './../types/userType'
import { excludedFields } from './../constants/constants'
import mongoose from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import bcrypt from 'bcryptjs'

class UserExcludedFields extends excludedFields {
  static password = 'password'
}

const emailValidation = {
  validator: (val: string) => {
    return isEmail(val)
  },
  message: 'Email validation fail',
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate: emailValidation,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
    },
    refreshTokens: [
      {
        jwtId: { type: String, required: true },
        fingerPrint: { type: String, required: true },
        expiredAt: { type: Number, required: true },
        createdAt: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
)

userSchema.methods.toJSON = function () {
  let userObj = this.toObject()
  for (const field in UserExcludedFields) {
    delete userObj[field]
  }
  return userObj
}

export default mongoose.model<IUser>('User', userSchema)
