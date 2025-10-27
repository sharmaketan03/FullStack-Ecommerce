import { useContext, useEffect, useState } from "react";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { instance } from "../axios";
import Bannerslider from "./Bannerslider";

function Home() {
  const [products, setProducts] = useState([]);
  const { input, user } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await instance.get("app/detail/getallproducts", {
          withCredentials: true,
        });
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchData();
  }, []);

  // 🔍 Filter products based on search input
  const filteredProducts = input
    ? products.filter((item) =>
        item.category?.toLowerCase().includes(input.toLowerCase())
      )
    : products;

  // 🌀 Loader
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-purple-400 border-b-transparent rounded-full animate-spin animation-delay-150"></div>
        </div>
      </div>
    );
  }

  // 🧱 Product Grid Layout
  const ProductGrid = (
    <div
      className="grid gap-6 px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 ease-in-out
                 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-[1400px] mx-auto"
    >
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => (
          <div
            key={item._id}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl 
                       transition-all duration-300 overflow-hidden
                       transform hover:-translate-y-2 hover:scale-[1.02]
                       border border-gray-100 relative"
          >
            {/* 🖼 Product Image */}
            <Link
              to={`/product/${item._id}`}
              className="block relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
            >
              {/* ✅ Fix: Add z-index layers properly */}
              <div className="relative h-[240px] flex justify-center items-center p-6 z-10">
                <img
                  src={item.PrimaryImage}
                  alt={item.name || "Product"}
                  className="object-contain h-full w-auto transform group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"></div>
              </div>

              {/* ✅ Fixed Discount Badge (Always Above Image) */}
              {item.Originalprice &&
                item.Discountedprice &&
                item.Originalprice > item.Discountedprice && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-50">
                    {Math.round(
                      ((item.Originalprice - item.Discountedprice) /
                        item.Originalprice) *
                        100
                    )}
                    % OFF
                  </div>
                )}
            </Link>

            {/* 📝 Product Details */}
            <div className="p-5 space-y-3">
              <h2 className="text-lg font-bold text-gray-800 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors duration-200">
                {item.Discription || "No description"}
              </h2>

              {/* 💰 Price Section */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">
                    Original:
                  </span>
                  <div className="flex items-center gap-1 text-gray-400 line-through">
                    <PiCurrencyDollarBold className="text-base" />
                    <span className="font-semibold">{item.Originalprice}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 font-semibold">
                    Sale Price:
                  </span>
                  <div className="flex items-center gap-1 text-green-600">
                    <PiCurrencyDollarBold className="text-xl" />
                    <span className="text-2xl font-bold">
                      {item.Discountedprice}
                    </span>
                  </div>
                </div>
              </div>

              {/* 🔘 View Details Button */}
              <Link
                to={`/product/${item._id}`}
                className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-xl font-semibold
                           hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02]
                           transition-all duration-300 shadow-md hover:shadow-lg mt-4"
              >
                View Details
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-20">
          <div className="text-8xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">Try searching with different keywords</p>
          <div className="mt-4 px-6 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
            Searched: "{input}"
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {user?.role === "admin" ? (
        // 🧑‍💻 Admin View
        <div className="py-8">
          <div className="max-w-[1400px] mx-auto px-4 mb-8">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-6 shadow-xl">
              <h1 className="text-3xl font-bold mb-2">👨‍💼 Admin Dashboard</h1>
              <p className="text-amber-100">Manage your products efficiently</p>
            </div>
          </div>
          {ProductGrid}
        </div>
      ) : (
        <>
          {/* 🖼 Banner Slider */}
          <div className="relative">
            <Bannerslider />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 pointer-events-none"></div>
          </div>

          {/* 🎯 Featured Header */}
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                Featured Products
              </h2>
              <p className="text-gray-600 text-lg">
                Discover our amazing collection
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
            </div>
          </div>

          {/* 🛍 Product List */}
          <div className="pb-12">{ProductGrid}</div>

          {/* 📢 Bottom Banner */}
          <div className="w-full relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img
              src="https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX51498351.jpg"
              alt="Bottom Banner"
              className="w-full h-[200px] md:h-[250px] object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* 🎨 Decorative Wave */}
          <div className="h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        </>
      )}
    </div>
  );
}

export default Home;
