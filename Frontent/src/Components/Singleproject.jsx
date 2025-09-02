import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { instance } from "../axios";

function Singleproject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [DisabledWishlist, setDisabledWishlist] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const {
    AddtoWishlist,
    setAddtoWishlist,
    addtocartid,
    setAddtocartid,
    Quantity,
    setQuantity,
    Cart,
    setCart,
  } = useContext(UserContext);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  async function fetchData(id) {
    try {
      const response = await instance.get("/app/detail/get/" + id);
      setProduct(response.data);
    } catch (err) {
      console.log("Fetch product error:", err);
    }
  }

  async function handleAddCart(e) {
    e.preventDefault();
    if (id && !disabled) {
      setDisabled(true);
      setCart(Cart + 1);
      setAddtocartid([...addtocartid, id]);
      navigate("/cart");
    }
    try {
      let value = await instance.post(
        "/app/details/AddtoCart",
        {
          product: id,
          quantity: 1,
        },
        { withCredentials: true }
      );
      console.log(value);
    } catch (err) {
      console.log("Add To Cart:", err);
    }
  }

  async function AddWishlist(e) {
    e.preventDefault();
    
    if (id && !DisabledWishlist) {
      setDisabledWishlist(true);
      setAddtoWishlist([...AddtoWishlist, id]);
}
  try{
      let res=await instance.post('app/details/AddTOWishlist/' + id ,{},{withCredentials:true})
  }catch(err){
      console.log(err)
  }
  }

  // console.log(AddWishlist)
  return (
    <div className="flex flex-col md:flex-row items-start gap-10 p-6 bg-gray-100 min-h-screen">
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={product.PrimaryImage}
          alt=""
          className="w-72 h-72 object-contain rounded-lg shadow-md border"
        />
      </div>

      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
        <h3 className="text-gray-600">{product.Discription}</h3>
        <p className="text-sm text-gray-500">{product.Attribute}</p>
        <h1 className="text-lg text-gray-700">
          <span className="font-semibold">Original Price:</span> $
          {product.Originalprice}
        </h1>
        <h1 className="text-lg text-green-600 font-semibold">
          Discounted Price: ${product.Discountedprice}
        </h1>

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50 transition"
          onClick={handleAddCart}
          disabled={disabled}
        >
          Add To Cart
        </button>

        <button
          className="bg-pink-600 text-white px-5 py-2 ml-4 rounded-lg shadow hover:bg-pink-700 disabled:opacity-50 transition"
          onClick={AddWishlist}
          disabled={DisabledWishlist}
        >
          Wishlist
        </button>
      </div>
    </div>
  );
}

export default Singleproject;
