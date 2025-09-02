import path from "path";
import userModel from "../Models/userModel.js";
import { User } from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { productModel } from "../Models/productModel.js";
import { measureMemory } from "vm";
import {OAuth2Client} from "google-auth-library"
import nodemailer from "nodemailer"
import { text } from "stream/consumers";

const Client = new OAuth2Client(process.env.Google_Client_id)
console.log(Client)

// import { use } from "react"
export async function Register(req, res) {
  // console.log(req.body);
  const { firstname, lastname, email, password } = req.body;

  try {
    if (!email || !password || !firstname || !lastname) {
      return res.status(400).json({ message: "message:missing fields" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "message:user already exists" });
    }

    const hashedpass = await bcrypt.hash(password, 10);
    // console.log("Hashed password:", hashedpass);

    const newUser = new userModel({
      firstname,
      lastname,
      email,
      password: hashedpass,
    });

    await newUser.save();
    console.log('register email 1:',email)

    let auth= nodemailer.createTransport({
          service:'gmail',
          secure:false,
          port:587,
          auth:{
            user: "ketan301024@gmail.com",
            pass: "wazf xyqj axlh mtyc"
          }

    })
   const reciver = {
  from: "ketan301024@gmail.com",
  to: email,
  subject: "Welcome to Ecommerce Web (aapki apni dukkan)! 🎉",
  text:
    "Hi " + firstname + " " + lastname + ",\n\n" +
    "Thank you for registering with Ecommerce Web App.\n" +
    "We’re excited to have you onboard! 🎊\n\n" +
    "You can now explore our latest collections, track your orders, and enjoy exclusive offers.\n\n" +
    "👉 Get started here: Ecommerce Web(apki apni dukkan)\n\n" +
    "Best regards,\n" +
    "Team Ecommerce Web",
};

auth.sendMail(reciver,(error,emailresponse)=>{
  if(error){
    return console.log("Error:", error);
  }
  console.log("Message sent: %s",emailresponse.messageId)
})


    return res
      .status(200)
      .json({ message: "message:user registered successfully" });
  } catch (err) {
    console.error("Error in Register:", err);
    res.status(500).json({ message: "message: server error" });
  }
}

export async function Login(req, res) {
  const { email, password } = req.body;

  try {
    let finddata = await userModel.findOne({ email });
    if (!finddata) {
      return res
        .status(401)
        .json({ message: "message:This user does not Exists" });
    }
    let match = await bcrypt.compare(password, finddata.password);
    if (!match)
      return res.status(400).json({ message: "password doesn't match" });

    let token = jwt.sign({ id: finddata._id }, process.env.Secret_Key, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ message: "Login Successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "message:Internal server error", error: err.message });
  }
}


export async function GoogleAuthentication(req,res) {
       try{
             const {token} = req.body
             console.log('GoogleAuthentication:',token)
             let verify=await Client.verifyIdToken({
               idToken:token,
               audience:process.env.Google_Client_id

             })
             console.log("verify:",verify)
             let information= verify.getPayload()
             let {name,email,picture}=information
             console.log(name,email,information)
             let check = await userModel.findOne({email:email})
             console.log(check)
             if(!check){
                 let newuser= new userModel({
                 name,
                 email,
                 picture
                 })

                 await newuser.save()

                
             }
              let tokenjwt=jwt.sign({id:check._id},process.env.Secret_Key,{expiresIn:'1d'})

                 res.cookie("tokenjwt",tokenjwt,{
                  httpOnly:true,
                  secure:false,
                  sameSite:'lax',
                  maxAge:24*60*60*1000
                 })

                 res.status(200).json({message:"successs fully google cookies sent"})

       }catch(err){
          console.log("googleauth:",err)
       }
  
}










export async function UserloginLogOut(req, res) {
  console.log(req.cookies.tokenjwt);
  if (req.cookies.token || req.cookies.tokenjwt) {
    return res.json({ message: "User Logged In", user: req.user });
  } else {
    return res.status(403).json({ message: "error verification" });
  }
}

export async function Logout(req, res) {
  //  console.log(req.cookies)
  try {
    (res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    }) &&  res.clearCookie("tokenjwt",{
      httpOnly: true,
      secure: false,
      sameSite: "lax",

    }))
    // console.log("yhaa tk shi h")
    return res.status(200).json({ message: " LogOut user " });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "LogOut Unsucseefully", error: err.message });
  }
}

export async function addWishlist(req, res) {
  console.log(req.params.id,req.user.id)
  try{
       let faindid=await userModel.findById(req.user.id)
       console.log(faindid)
       if(!faindid)return res.status(400).json({message:'ID does not Found'})
      let value= faindid.Wishlist.some(item=>item.toString().includes(req.params.id.toString()))
      if(value){
        
           return res.status(400).json({ message: "Already in Wishlist" });
      }
         faindid.Wishlist.push(req.params.id)
      await faindid.save()
      res.status(200).json({message:'Added To Wishlist'})
  }catch(err){
   res.status(500).json({message:'Internal server error'})
  }
}


export async function getallwislistproducts(req, res) {
  try {
    console.log("addedallwishlistid", req.user.id);

    const user = await userModel.findById(req.user.id);
    console.log("Found user:", user?._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const allIds = user.Wishlist.map(item => item.toString());
    console.log("All IDs:", allIds);

    
    return res.status(200).json({
      message: "Added All products",
      wishlist: allIds
    });
  } catch (err) {
    console.error("getallwislistproducts error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}














export async function AddCart(req, res) {
  const { product, quantity } = req.body;
  // console.log("Received:", product, quantity);

  try {
    const foundProduct = await productModel.findById(product);
    // console.log(foundProduct);
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" }); 
    }

    
    const user1 = await userModel.findById(req.user.id);
    // console.log(user1);
    if (!user1) {
      return res.status(404).send("message: User not found");
    }
   
    user1.Cart.push({ product: product, quantity: quantity });
    await user1.save();
    // console.log(user1.Cart);
    return res.status(200).send("message:Product added to cart"); 
  } catch (err) {
    console.error("AddCart error:", err.message);
    return res
      .status(500)
      .send("     message: Internal server error", err.message);
  }
}

export async function DeletetheWish(req, res) {
     console.log('req body:',req.params.id,req.user.id)
     try{
         let faindid=await userModel.findById(req.user.id)
         console.log(faindid)
         if(!faindid) return res.status(400).json({message:'User Not Found'})
        faindid.Wishlist=faindid.Wishlist.filter(item=>item.toString()!==req.params.id.toString())
        console.log(faindid.Wishlist)
        await faindid.save()
        res.status(200).json({message:"Product Deleted Successfull"})
     }catch(err){
          res.status(500).json({message:"Internal Server Error",Error:err.message})
     }
}

export async function DeleteProduct(req, res) {
  // console.log(req.params.id,req.user.id)
  try {
    let founduser = await userModel.findById(req.user.id);
   if(!founduser) return res.status(400).json({message:"User not found"})
    let productID = req.params.id;

    founduser.Cart = founduser.Cart.filter(
      (item) => item.product.toString() !== productID.toString()
    );

    await founduser.save();

   return res.status(200).json({message:"product deleted Successfully"})
  } catch (err) {}
}

export async function AddedAllProducts(req, res) {
  try {
    // console.log("req.user.id:",req.user.id);
     let founduser=await userModel.findById(req.user.id)
     if(!founduser) return res.status(400).json({message:"User not found"})
    let allids= founduser.Cart.map(item=> item.product.toString())
    // console.log(allids)
     res.status(200).json({message:"get the all add to cart data",Id:allids})
  } catch (err) {
    console.log(err);
  }
}

export async function updatedQuantity(req,res){
    let value= Object.values(req.body.quantity)[0]
    console.log(req.params.id,value + 1)
    try{
         let faindid=await userModel.findById(req.user.id)
        //  console.log('faindid:',faindid)
         if(!faindid) return res.status(400).json({message:'The Product does not found'})
        faindid.Cart=  faindid.Cart.map((item)=> {
           if(item.product.toString()==req.params.id.toString()){
             item.quantity=value + 1
             console.log(faindid.Cart.quantity,faindid)
           }
           return item
        })
       await faindid.save()
       res.status(200).json({message:'this is the message'})
    }catch(err){
    console.log('err',err)
    }
}

export async function updatedQuantityminus(req,res){
          console.log('quantity:',req.user.id,req.body.quantity)
          let value =Object.values(req.body.quantity)[0]
          console.log("value:",value-1)
          try{
              let faindid=await userModel.findById(req.user.id)
              console.log(faindid)
              if(!faindid)res.status(400).json({message:"Product doest not Add"})
              faindid.Cart=faindid.Cart.map((item)=>{
                 if(item.product.toString()==req.params.id.toString()){
                  item.quantity=value-1
                 }
                 return item
              })
            await faindid.save()
            res.status(200).json({message:'product added'})
          }catch(err){

          }
}