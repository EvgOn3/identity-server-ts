import { IUserDocument, IUserModel } from './../types/userType'
import { excludedFields } from './../constants/constants'
import { model, Schema } from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import bcrypt from 'bcryptjs'
import generateTokens from './tokensGeneratorService'

class UserExcludedFields extends excludedFields {
  static password = 'password'
}

const emailValidation = {
  validator: (val: string) => {
    return isEmail(val)
  },
  message: 'Email validation fail',
}

const userSchema = new Schema(
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

userSchema.methods.toJSON = function (this: IUserDocument) {
  let userObj = this.toObject()
  for (const field in UserExcludedFields) {
    delete userObj[field]
  }
  return userObj
}

userSchema.methods.generateTokens = generateTokens

userSchema.pre<IUserDocument>('save', async function (next) {
  if (this.isModified(UserExcludedFields.password))
    this.password = await bcrypt.hash(this.password, 8)

  next()
})

userSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email })
  if (!user) return null

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return null

  return user
}

const User = model<IUserDocument, IUserModel>('User', userSchema)

export default User
