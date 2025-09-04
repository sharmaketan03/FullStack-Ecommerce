import { Router } from "express";
import { ADDallproduct ,GetALLproducts,GetSingleProduct} from "../Controllers/ProductDetails.js";
import upload from "../Middelware/CloudinaryStorage.js";
import multer from "multer";

const  Products=Router()

Products.post("/addallproducts",upload.fields([
    { name: "PrimaryImage", maxCount: 1 },      
    { name: "SecondaryImages", maxCount: 5 }, 
  ]),ADDallproduct)
Products.get("/getallproducts",GetALLproducts)
Products.get("/get/:id",GetSingleProduct)



export {Products}

