import { useState } from "react";
import { instance } from "../axios"; // apna axios instance import

function AddProductForm() {
  const [formData, setFormData] = useState({
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

  // ✅ Input change handler
  const handleChange = (e) => {
    const { name, type, files, value, multiple } = e.target;
   console.log(name,type,files,value,multiple)
    if (type === "file") {
      if (multiple) {
        setFormData({ ...formData, [name]: Array.from(files) });
      } else {
        setFormData({ ...formData, [name]: files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    const data = new FormData();
     
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((file) => data.append(key, file));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const res = await instance.post("/app/detail/addallproducts", data, {
       
        withCredentials: true,
      });

      console.log("✅ Product Added:", res);
      alert("Product added successfully!");

      // reset form
      setFormData({
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
    } catch (err) {
      console.error("❌ Error adding product:", err);
      
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {/* Slug */}
        <input
          type="text"
          name="slug"
          placeholder="Slug (unique)"
          value={formData.slug}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {/* Primary Image */}
        <input
          type="file"
          name="PrimaryImage"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {/* Secondary Images */}
        <input
          type="file"
          name="SecondaryImages"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {/* Quantity */}
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="Originalprice"
            placeholder="Original Price"
            value={formData.Originalprice}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="Discountedprice"
            placeholder="Discounted Price"
            value={formData.Discountedprice}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <textarea
          name="Discription"
          placeholder="Description"
          value={formData.Discription}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>

        {/* Attribute */}
        <input
          type="text"
          name="Attribute"
          placeholder="Attributes (e.g. Color: Red, Size: M)"
          value={formData.Attribute}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;
