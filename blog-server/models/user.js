

import validator from "validator";
import mongoose from 'mongoose'
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLenght: 3,
    maxLenght: 30,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxLenght: 30,
    validator: {
      validator: validator.isEmail,
      message: "please provide valid email",
    },
  },
  password: {
    type: String,
    minLenght: 6,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});


const User = mongoose.model('User',userSchema)

export default User;