import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { instance } from "../axios";
import OrderFormWrapper from "./OrderForm.jsx";
import "../index.css";

function Singleproject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]); // ✅ similar products
  const [disabled, setDisabled] = useState(false);
  const [DisabledWishlist, setDisabledWishlist] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const {
    AddtoWishlist,
    setAddtoWishlist,
    addtocartid,
    setAddtocartid,
    Cart,
    setCart,
    user,
  } = useContext(UserContext);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  // ✅ Fetch product + similar products
  async function fetchData(id) {
    try {
      const response = await instance.get("/app/detail/get/" + id);
      const mainProduct = response.data;
      setProduct(mainProduct);

      // ✅ Fetch all products
      const allRes = await instance.get("app/detail/getallproducts", {
        withCredentials: true,
      });

      const allProducts = allRes.data.products || allRes.data || [];

      // ✅ Filter similar products by category
      const similar = allProducts.filter(
        (p) =>
          p.category?.toLowerCase() === mainProduct.category?.toLowerCase() &&
          p._id !== mainProduct._id
      );
      setSimilarProducts(similar);
    } catch (err) {
      console.log("Fetch product error:", err);
    }
  }

  // ✅ Add to Cart
  async function handleAddCart(e) {
    e.preventDefault();
    if (id && !disabled) {
      setDisabled(true);
      setCart(Cart + 1);
      setAddtocartid([...addtocartid, id]);
      navigate("/cart");
    }
    try {
      await instance.post(
        "/app/details/AddtoCart",
        { product: id, quantity: 1 },
        { withCredentials: true }
      );
    } catch (err) {
      console.log("Add To Cart:", err);
    }
  }

  // ✅ Delete product (admin only)
  async function DeleteProduct(id) {
    try {
      const res = await instance.delete("/app/detail/ProductDelete/" + id);
      if (res.status === 200) navigate("/");
    } catch (err) {
      console.log("error found in delete admin product", err);
    }
  }

  // ✅ Edit product
  async function EditProduct(id) {
    navigate("/EditProduct/" + id);
  }

  // ✅ Add to Wishlist
  async function AddWishlist(e) {
    e.preventDefault();
    if (id && !DisabledWishlist) {
      setDisabledWishlist(true);
      setAddtoWishlist([...AddtoWishlist, id]);
    }
    try {
      await instance.post("app/details/AddTOWishlist/" + id, {}, { withCredentials: true });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 🔹 Product Detail Section */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 p-6 md:p-10">
            {/* Product Image */}
            <div className="w-full lg:w-1/2 flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <img
                  src={product.PrimaryImage}
                  alt={product.name}
                  className="relative w-80 h-80 object-contain rounded-xl shadow-lg transform group-hover:scale-105 transition duration-300"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.Discription}
                </p>
              </div>

              {product.Attribute && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <p className="text-sm text-blue-800 font-medium">
                    {product.Attribute}
                  </p>
                </div>
              )}

              {/* Pricing */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 font-medium">Original Price:</span>
                  <span className="text-gray-500 line-through text-xl">
                    ${product.Originalprice}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-800 font-semibold text-lg">Discounted Price:</span>
                  <span className="text-green-600 font-bold text-3xl">
                    ${product.Discountedprice}
                  </span>
                </div>
                {product.Originalprice && product.Discountedprice && (
                  <div className="mt-3 text-right">
                    <span className="inline-block bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      Save{" "}
                      {Math.round(
                        ((product.Originalprice - product.Discountedprice) /
                          product.Originalprice) *
                          100
                      )}
                      %
                    </span>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="space-y-4 pt-4">
                {user?.role === "admin" ? (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
                      onClick={() => DeleteProduct(product._id)}
                    >
                      🗑️ Delete
                    </button>
                    <button
                      className="flex-1 bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600"
                      onClick={() => EditProduct(product._id)}
                    >
                      ✏️ Edit
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                      onClick={() => setShowOrderForm(true)}
                    >
                      🛒 Buy Now
                    </button>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                        onClick={handleAddCart}
                      >
                        🛍️ Add To Cart
                      </button>
                      <button
                        className="flex-1 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700"
                        onClick={AddWishlist}
                      >
                        ❤️ Wishlist
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              You may also like
            </h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {similarProducts.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg p-4 transition-transform duration-300 hover:-translate-y-1"
                >
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={item.PrimaryImage}
                      alt={item.name}
                      className="h-52 w-full object-contain mb-3"
                    />
                    <h3 className="font-semibold text-gray-800 text-lg truncate">
                      {item.name}
                    </h3>
                    <p className="text-green-600 font-bold">
                      ${item.Discountedprice}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Order Form Popup */}
      {showOrderForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={() => setShowOrderForm(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
              onClick={() => setShowOrderForm(false)}
            >
              ×
            </button>
            <OrderFormWrapper product={product} onClose={() => setShowOrderForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Singleproject;
