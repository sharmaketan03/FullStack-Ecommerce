   import mongoose from "mongoose"

   export let productSchema=new mongoose.Schema({
      name:{
         type:String,
         required:true
      },
      slug:{
         type:String,
         unique:true   
      },
      category:{
      type:String,
      required :true
      },
      PrimaryImage:{
      type:String,
      required:true
      },
      SecondaryImages:
        [ {type:String}]
        
      ,
      quantity:{
      type:Number,
      required:true
      },
      Originalprice:{
         type:String,
         required:true
      },
      Discountedprice:{
      type:String,
      required:true
      },
      Discription:{
         type:String,
         required:true
      },
      Attribute:{
         type:String,
      }


   },{timestamps:true}
)

   export let productModel= mongoose.model("product",productSchema)
