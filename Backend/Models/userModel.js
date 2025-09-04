import mongoose from "mongoose"
import {productSchema,productModel} from './productModel.js'
 export let User=new mongoose.Schema({
            firstname:{
                type:String,
                required:false
            },
            lastname:{
               type:String,
               required:false
            },
            email:{
              type:String,
              required:true,
              unique:true
            },
           password:{
              type:String,
              required:false
            },
            role:{
                  type:String,
                  enum:["user","admin"] ,
                  default:'user'
            },
            Wishlist:[
                {   type:mongoose.Schema.Types.ObjectId,
                    ref:"product",
                    
                }
            ],
            Cart:[
                { product:{
                      type:mongoose.Schema.Types.ObjectId,
                      ref:'product',
                },
                quantity:{
                    type:Number,
                    min:1,
                }
              
              }
            ]
  })

let userModel= mongoose.model("user",User)
export default userModel