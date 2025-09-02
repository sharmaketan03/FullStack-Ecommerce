import mongoose from "mongoose";
import { productModel } from "../Models/productModel.js";
import path from "path";
import slugify from "slugify";
export async function ADDallproduct(req, res) {
  // console.log("single product", req.body);
  // console.log("reverse file nhi h:-", req.file);
  try {
    let PrimaryImage = req.file?.path;
    // console.log(PrimaryImage);
    let ADDallproducts = {
      ...req.body,
      slug:slugify(req.body.name) + "-" + Date.now(),
      PrimaryImage: PrimaryImage,
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


