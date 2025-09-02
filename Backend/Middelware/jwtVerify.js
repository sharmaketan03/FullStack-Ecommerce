

import "dotenv/config"
import jwt, { decode } from 'jsonwebtoken';
export function verifyuser(req,res,next){
      
  
  console.log(req.cookies)
    const token = (req.cookies.token || req.cookies.tokenjwt) || req.headers.authorization?.split(" ")[1];
   
   console.log("token:",token)
   if(!token)return res.status(401).json({message:"Token missing"})
    
    try {
    console.log("hello3")
    const decoded = jwt.verify(token, process.env.Secret_Key);
    console.log(decoded)
    req.user=decoded
   
    next()
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(403).json({ message: "Invalid token", error: err.message });
  }
 
}