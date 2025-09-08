import React, { useEffect, useState } from "react";
import { instance } from "../axios.js";
import { useParams } from "react-router-dom";

function EditProduct() {
  const [edit, setEdit] = useState({
    name: "",
    slug: "",
    category: "",
    PrimaryImage: null,
   SecondaryImages: [],
    quantity: "",
    Originalprice: "",
    Discountedprice: "",
    Discription: "",
    Attribute: "",
  });

  let { id } = useParams();

  async function fetchSingleProduct() {
    try {
      let res = await instance.get("/app/detail/get/" + id);
      if (res) {
        setEdit({
          name: res.data.name,
          slug: res.data.slug,
          category: res.data.category,
          PrimaryImage: null,
        SecondaryImages: [],
          quantity: res.data.quantity,
          Originalprice: res.data.Originalprice,
          Discountedprice: res.data.Discountedprice,
          Discription: res.data.Discription,
          Attribute: res.data.Attribute,
        });
      }
    } catch (err) {
      console.log("Edit Product:", err);
    }
  }

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  function handleChange(e) {
    const {name,files,value,type}=e.target 
    console.log(name,files,value,type)
   if(name=="PrimaryImage"){
         setEdit(prev=>({...prev,PrimaryImage:files[0]}))
   }else if (name=="SecondaryImages"){
        console.log("Secondary Image:",files)
        let newfile=Array.from(files)


        setEdit(prev=>({...prev,SecondaryImages:[...prev.SecondaryImages,...newfile]}))


   }else{
      setEdit(prev=>({...prev,[name]:value}))
   }

   

   

  }

async function handleSubmit(e){
      e.preventDefault()
     let formdata=new FormData()

     formdata.append("name",edit.name)
     formdata.append("slug",edit.slug)
     formdata.append("category",edit.category)
     formdata.append("quantity",edit.quantity)
     formdata.append("Originalprice",edit.Originalprice)
     formdata.append("Discountedprice",edit.Discountedprice)
     formdata.append("Discription",edit.Discription)
     formdata.append("Attribute",edit.Attribute)

     if(edit.PrimaryImage){
         formdata.append("PrimaryImage",edit.PrimaryImage)
     }
    if (edit.SecondaryImages.length>0) {
       edit.SecondaryImages.forEach(file => {
            formdata.append("SecondaryImages",file)
       });
      
      
      

        console.log(formdata)


        for(let [key,value] of formdata.entries()){
              console.log(key,value)
        }
     }
  
    try{
        let res =await instance.put("/app/detail/EditProducts/" +id ,formdata)
        console.log(res)
        
    }catch(err){
       console.log("Edit product in backend:",err)
    }

      
   


 }  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit}   className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={edit.name}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              onChange={handleChange}
              value={edit.slug}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Category
            </label>
            <input
              type="text"
              name="category"
              onChange={handleChange}
              value={edit.category}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Quantity
            </label>
            <input
              type="text"
              name="quantity"
              onChange={handleChange}
              value={edit.quantity}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          {/* Original Price */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Original Price
            </label>
            <input
              type="text"
              name="Originalprice"
              onChange={handleChange}
              value={edit.Originalprice}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          {/* Discounted Price */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Discounted Price
            </label>
            <input
              type="text"
              name="Discountedprice"
              onChange={handleChange}
              value={edit.Discountedprice}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="Discription"
              onChange={handleChange}
              value={edit.Discription}
              rows="3"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          {/* Attribute */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Attribute
            </label>
            <input
              type="text"
              name="Attribute"
              onChange={handleChange}
              value={edit.Attribute}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
            />
          </div>

          {/* Primary Image */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Primary Image
            </label>
            <input
              type="file"
              name="PrimaryImage"
              onChange={handleChange}
              className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
          </div>

          {/* Secondary Images */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Secondary Images
            </label>
            <input
              type="file"
              name="SecondaryImages"
              onChange={handleChange}
              multiple
              className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
          </div>

          {/* Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
