import { ErrorResponse } from './../contracts/v1/responses'
import { IUserDocument, IUserModel } from './../types/userType'
import { excludedFields } from './../constants/constants'
import { model, Schema } from 'mongoose'
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

userSchema.methods.toJSON = function () {
  let userObj = this.toObject()
  for (const field in UserExcludedFields) {
    delete userObj[field]
  }
  return userObj
}

userSchema.pre<IUserDocument>('save', async function (next) {
  if (this.isModified(UserExcludedFields.password))
    this.password = await bcrypt.hash(this.password, 8)

  next()
})

userSchema.statics.findByCredentials = async (
  email: string,
  password: string
): Promise<IUserDocument> => {
  const user = await User.findOne({ email })

  if (!user) throw new ErrorResponse(400, 'User not found')

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) throw new ErrorResponse(400, 'Incorrect password')

  return user
}

const User = model<IUserDocument, IUserModel>('User', userSchema)

export default User
