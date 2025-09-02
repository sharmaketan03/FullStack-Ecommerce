import { useContext, useEffect, useState } from "react";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { instance } from "../axios";
import Bannerslider from "./Bannerslider";

function Home() {
  const [products, setProducts] = useState([]);
  const { input } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await instance.get("app/detail/getallproducts", {
          withCredentials: true,
        });
        // console.log(response.data.products);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchData();
  }, []);

  const filteredProducts = input
    ? products.filter((item) =>
        item.category.toLowerCase().includes(input.toLowerCase())
      )
    : products;

  return (
    <>
   
     <div>
       <Bannerslider/>
     </div>
     
  <div className="mt-8 w-full h-[180px]">
  <img
    src="https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX51498351.jpg"
    alt="Bottom Banner"
    className="w-full h-full object-fill"
  />
</div>


      {products.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 bg-gray-100 min-h-screen ">
          {filteredProducts.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col"
            >
              <Link to={`/product/${item._id}`}>
                <img
                  src={item.PrimaryImage}
                  alt={item.name || "Product"}
                  className="h-48 w-full object-contain mb-4"
                />
              </Link>
              <h1 className="text-lg font-semibold text-gray-800 mb-2">
                {item.Discription ? item.Discription.slice(0, 20) + "..." : "No description"}
              </h1>

              <div className="text-gray-600 text-sm space-y-1">
                <p className="flex items-center gap-1">
                  Original Price:
                  <PiCurrencyDollarBold className="text-green-500" />
                  {item.Originalprice}
                </p>
                <p className="flex items-center gap-1">
                  Discounted Price:
                  <PiCurrencyDollarBold className="text-green-500" />
                  {item.Discountedprice}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Home;
