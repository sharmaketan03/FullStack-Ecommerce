import { Router } from "express";
import { ADDallproduct ,GetALLproducts,GetSingleProduct} from "../Controllers/ProductDetails.js";
import upload from "../Middelware/CloudinaryStorage.js";
import multer from "multer";

const  Products=Router()

Products.post("/addallproducts",upload.single("PrimaryImage"),ADDallproduct)
Products.get("/getallproducts",GetALLproducts)
Products.get("/get/:id",GetSingleProduct)



export {Products}

