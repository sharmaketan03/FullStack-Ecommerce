import { Router } from "express";
import { ADDallproduct ,GetALLproducts,GetSingleProduct,deleteProduct,updateProduct,PayementMethod} from "../Controllers/ProductDetails.js";
import upload from "../Middelware/CloudinaryStorage.js";
import multer from "multer";
import { DeleteProduct } from "../Controllers/UserDetails.js";

const  Products=Router()

Products.post("/addallproducts",upload.fields([
    { name: "PrimaryImage", maxCount: 1 },      
    { name: "SecondaryImages", maxCount: 5 }, 
  ]),ADDallproduct)
Products.get("/getallproducts",GetALLproducts)
Products.get("/get/:id",GetSingleProduct)
Products.delete("/ProductDelete/:id",deleteProduct)
Products.put("/EditProducts/:id",upload.fields([
  {name:"PrimaryImage",maxCount:1},
  {name:"SecondaryImages",maxCount:5}
]),updateProduct)


Products.post("/create-payment-intent",PayementMethod)



export {Products}

