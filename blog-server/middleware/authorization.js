
import User from "../models/user.js";
import Jwt  from "jsonwebtoken";


const CheckAuth = async(req,res,next)=>{

    let token;
    const { authorization } = req.headers;
   

    if (authorization && authorization.startsWith("Bearer")) {
      try {

        token = authorization.split(' ')[1]
        // verify Token
          
        const { userId } = Jwt.verify(token, process.env.JWT_REFRESS_SECRET);
       
        // get user from token
        req.user = await User.findById(userId).select('-password')
       
        next()
      } catch (error) {
        return res.status(401).json({ message: "unAuthorized user" });
      }
    }


    if(!token){
    return res.status(401).json({ message: "unAuthorized user,No Token" });
    }
} 

export default CheckAuth