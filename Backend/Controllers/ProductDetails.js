import mongoose from "mongoose";
import { productModel } from "../Models/productModel.js";
import path from "path";
import slugify from "slugify";
import { cloudinary } from "../Config/cloudinary.js";
export async function ADDallproduct(req, res) {
  console.log("single product", req.body);
  console.log("reverse file nhi h:-", req.files);
  try {
    let PrimaryImage= await cloudinary.uploader.upload(req.files?.PrimaryImage?.[0]?.path)
       let  SecondaryImages= await cloudinary.uploader.upload(req.files?.SecondaryImages?.[0]?.path)
    console.log("secondaryImages:",SecondaryImages,PrimaryImage)
    console.log(req.files)
    // console.log(PrimaryImage);
    let ADDallproducts = {
      ...req.body,
      slug:slugify(req.body.name) + "-" + Date.now(),
      PrimaryImage: PrimaryImage.path,
      SecondaryImages:SecondaryImages.path
    };
    // console.log("ADDallProducts:",ADDallproducts)
    let newProduct = new productModel(ADDallproducts);
    // console.log("newProduct",newProduct)
    await newProduct.save();
    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (err) {
    res.status(500).json({message:"Internal server Error"});
  }
}

export async function GetALLproducts(req, res) {
  // console.log("GetProducts");
  try {
    let products = await productModel.find();
    // console.log(products)
    res.status(200).json({message:"Data Fetch Successfully",products});
  } catch (err) {
    res
      .status(500)
      .send({ error: "failed to fetch products", details: err.message });
  }
}

export async function GetSingleProduct(req, res) {
  
  
  try {
     let id = req.params.id;
    //  console.log(id)
    if(!id) return res.status(400).json({message:"ID is not Found"})
    let Found = await productModel.findById(id);
    res.status(200).json(Found);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export async function deleteProduct(req,res) {
        const id =req.params.id
         try{
              let findProduct=await productModel.findByIdAndDelete(id)
              // console.log(findProduct)

             
         res.status(200).json({Message:"Product Delete Successfully"})
        }catch(err){
           res.status(500).json({Error:"Intrnal server error",err:err})
         }
  
}

export async function updateProduct(req,res){
      let {id}= req.params
   
       
       
           console.log(req.body,req.files,id)


           try{
              
                  let update={...req.body}
                      if(req.files?.PrimaryImage?.length>0){
                          update.PrimaryImage=req.files?.PrimaryImage[0].path
                      }
                      if(req.files?.SecondaryImages?.length>0){
                          update.SecondaryImages=req.files.SecondaryImages.map(item=>item.path)
                      }

                      console.log(update)


                      let updatemodel=await productModel.findByIdAndUpdate(id,{ $set:update },{ new:true })
                      console.log(updatemodel)
                          res.status(200).json({message:"Successfully Edit Product"})
                      
                

          }catch(err){
             res.status(500).json({message:"Internal Server error",Error:err})
          }
          
}

 