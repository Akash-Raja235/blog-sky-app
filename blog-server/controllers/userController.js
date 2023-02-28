
import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Token from "../models/Token.js"
const signupUser = async(req, res)=>{
 
  const {name,username,password} = req.body
 if (!name || !username || !password) {
   return res.status(400).json({ message: "All field are required" });
 }
  try {
    const oldUser = await User.findOne({username});

    if (oldUser) {
      return res.status(400).json({ message: "user already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name:name, username:username, password:hashPassword });
    return res.status(200).json({message:"user signed up", user });
  } catch (error) {
    return res.json({ message: error.message });
  }

}

const Login = async(req,res)=>{
  const {username,password} = req.body;
  try {
    if(!username || !password){
    return res.status(400).json({message:"All field are required"})
  }
  const user = await User.findOne({username})
  if(!user){
    return res.status(400).json({message:"user not exit"})
  }
   const isCurrectPassword = await bcrypt.compare(password,user.password)
   if(!isCurrectPassword){
     return res.status(400).json({ message: "credential is not match" });
   }
  const accessToken = jwt.sign({userId:user._id,name:user.name}, process.env.JWT_SECRET,{expiresIn:"15m"})
  const refreshToken = jwt.sign({userId:user._id,name:user.name}, process.env.JWT_REFRESS_SECRET);
  const newToken = new Token({ token: refreshToken });
  await newToken.save()

   return res
     .status(200)
     .json({ message: "successfully login", name:user.name,username:user.username, accessToken, refreshToken });
}
   catch (error) {
    return res.json({message:error.message})
  }
}

const logoutUser = async(req,res)=>{
  const {token} = req.body;
 try {
   await Token.deleteOne({ token: token });
    return res.status(200).json({ message: "user logged Out" });
 } catch (error) {
  return res.json({ message: error.message });
 }
  
}
export { signupUser, Login, logoutUser };