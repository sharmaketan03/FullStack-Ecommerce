import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { instance } from "../axios";

function Cart() {
  const { addtocartid, setAddtocartid, Cart, setCart, Quantity, setQuantity } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [totalamount, setTotalAmount] = useState(0);

  useEffect(() => {
    async function fetcheddata() {
      if (addtocartid.length === 0) {
        setData([]);
        return;
      }

      const result = await Promise.all(
        addtocartid.map(async (id) => {
          let response = await instance.get("/app/detail/get/" + id);
          return response.data;
        })
      );

      // Merge stored quantities with defaults
      const newquantities = { ...Quantity };
      result.forEach((item) => {
        if (!(item._id in newquantities)) {
          newquantities[item._id] = 1;
        }
      });

      setQuantity(newquantities);
      setData(result);
    }

    fetcheddata();
  }, [addtocartid]);

  function increment(id) {
    setQuantity((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }));
  }

  function decrement(id) {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1)
    }));
  }

  function RemoveCart(index) {
    const updatedData = data.filter((_, index1) => index !== index1);
    const updatedAddToCartId = addtocartid.filter((_, index1) => index !== index1);

    setData(updatedData);
    setAddtocartid(updatedAddToCartId);

    // Remove quantity entry as well
    const updatedQuantities = { ...Quantity };
    delete updatedQuantities[data[index]._id];
    setQuantity(updatedQuantities);

    setCart(updatedAddToCartId.length);
  }

  useEffect(() => {
    let total = 0;
    data.forEach((item) => {
      const quantity = Quantity[item._id] || 1;
      const price = Number(item.Discountedprice || 0);
      total += quantity * price;
    });
    setTotalAmount(total);
  }, [data, Quantity]);

  if (addtocartid.length === 0) {
    return (
      <h1 className="text-center text-2xl mt-10 text-gray-500 font-semibold">
        🛒 Cart is empty
      </h1>
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={item._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 flex-shrink-0">
              <img src={item.PrimaryImage} alt={item.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
              <h3 className="text-gray-600">Discounted Price: ${item.Discountedprice}</h3>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => decrement(item._id)}
                  className="bg-red-100 hover:bg-red-200 px-3 py-1 rounded-full text-red-600 font-bold"
                >
                  -
                </button>
                <span className="text-lg font-medium">{Quantity[item._id] || 1}</span>
                <button
                  onClick={() => increment(item._id)}
                  className="bg-green-100 hover:bg-green-200 px-3 py-1 rounded-full text-green-600 font-bold"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-right">
              <span className="text-gray-600">Remove:</span>
              <button
                onClick={() => RemoveCart(index)}
                className="text-red-500 text-xl ml-2 hover:text-red-700"
              >
                &times;
              </button>
            </div>
          </div>
        ))}
      </div>
      <hr className="my-6 border-gray-300" />
      <div className="text-right text-xl font-semibold text-gray-800">
        Grand Total: ${totalamount.toFixed(2)}
      </div>
    </div>
  );
}

export default Cart;



// import React, { useEffect, useState, useContext, useRef, useCallback } from "react";
// import { UserContext } from "./UserContext";
// import { instance } from "../axios";

// function Cart() {
//   const { addtocartid, setAddtocartid, Cart, setCart, Quantity, setQuantity } =
//     useContext(UserContext);

//   const [data, setData] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const isMounted = useRef(true);
//   const lastCartLength = useRef(0);

//   // Global function to trigger cart refresh - exposed globally
//   useEffect(() => {
//     window.triggerCartRefresh = () => {
//       refreshCart();
//     };
    
//     return () => {
//       delete window.triggerCartRefresh;
//     };
//   }, []);

//   // Cleanup flag to avoid updating unmounted component
//   useEffect(() => {
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);

//   // Get all cart product IDs with better error handling
//   const allcartproduct = useCallback(async (silent = false) => {
//     if (!isMounted.current) return;
    
//     if (!silent) {
//       setLoading(true);
//       setError(null);
//     }
    
//     try {
//       const response = await instance.get("/app/details/CartAllProduct", {
//         withCredentials: true,
//       });

//       if (isMounted.current && response.data) {
//         const cartIds = response.data?.Id || [];
//         setCart(cartIds.length);
//         setAddtocartid(cartIds);
//         lastCartLength.current = cartIds.length;
        
//         return cartIds;
//       }
//     } catch (err) {
//       console.error("Error found in getallproducts", err);
//       if (isMounted.current) {
//         setError("Failed to load cart items");
//         setData([]);
//         setCart(0);
//         setAddtocartid([]);
//         lastCartLength.current = 0;
//       }
//     } finally {
//       if (isMounted.current && !silent) {
//         setLoading(false);
//       }
//     }
//   }, [setCart, setAddtocartid]);

//   // Fetch product details when IDs are updated
//   const fetchData = useCallback(async (cartIds = null, silent = false) => {
//     const idsToFetch = cartIds || addtocartid;
    
//     if (!Array.isArray(idsToFetch) || idsToFetch.length === 0) {
//       if (isMounted.current) {
//         setData([]);
//         setTotalAmount(0);
//         if (!silent) setLoading(false);
//       }
//       return;
//     }

//     if (!silent) setLoading(true);
    
//     try {
//       const result = await Promise.allSettled(
//         idsToFetch.map(async (id) => {
//           const response = await instance.get(`/app/detail/get/${id}`, {
//             withCredentials: true,
//           });
//           return response.data;
//         })
//       );

//       const filteredResults = result
//         .filter(res => res.status === 'fulfilled' && res.value)
//         .map(res => res.value);

//       // Initialize quantities for new items
//       const newQuantities = {};
//       filteredResults.forEach((item) => {
//         newQuantities[item._id] = Quantity[item._id] || 1;
//       });

//       if (isMounted.current) {
//         setQuantity((prev) => ({ ...prev, ...newQuantities }));
//         setData(filteredResults);
//         setError(null);
//       }
//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//       if (isMounted.current) {
//         setError("Failed to load cart details");
//       }
//     } finally {
//       if (isMounted.current && !silent) {
//         setLoading(false);
//       }
//     }
//   }, [addtocartid, Quantity, setQuantity]);

//   // Main refresh function
//   const refreshCart = useCallback(async (silent = false) => {
//     const cartIds = await allcartproduct(silent);
//     if (cartIds && cartIds.length > 0) {
//       await fetchData(cartIds, silent);
//     } else if (cartIds && cartIds.length === 0) {
//       setData([]);
//       setTotalAmount(0);
//     }
//   }, [allcartproduct, fetchData]);

//   // Initial load
//   useEffect(() => {
//     refreshCart();
//   }, []);

//   // Listen for various cart update triggers
//   useEffect(() => {
//     const handleCartUpdate = () => {
//       refreshCart(true); // Silent refresh for better UX
//     };

//     const handleStorageChange = (e) => {
//       if (e.key === 'cartUpdated') {
//         refreshCart(true);
//       }
//     };

//     const handleVisibilityChange = () => {
//       if (!document.hidden) {
//         refreshCart(true);
//       }
//     };

//     const handleFocus = () => {
//       refreshCart(true);
//     };

//     // Add all event listeners
//     window.addEventListener('cartUpdated', handleCartUpdate);
//     window.addEventListener('storage', handleStorageChange);
//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     window.addEventListener('focus', handleFocus);

//     return () => {
//       window.removeEventListener('cartUpdated', handleCartUpdate);
//       window.removeEventListener('storage', handleStorageChange);
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//       window.removeEventListener('focus', handleFocus);
//     };
//   }, [refreshCart]);

//   // Watch for context changes (when products are added from other components)
//   useEffect(() => {
//     // Check if cart count increased (new item added)
//     if (Cart > lastCartLength.current && Cart > data.length) {
//       lastCartLength.current = Cart;
//       refreshCart(true);
//     }
//     // Check if cart count decreased (item removed)
//     else if (Cart < lastCartLength.current) {
//       lastCartLength.current = Cart;
//       refreshCart(true);
//     }
//   }, [Cart, data.length, refreshCart]);

//   // Watch for addtocartid changes
//   useEffect(() => {
//     if (addtocartid && Array.isArray(addtocartid)) {
//       const currentDataIds = data.map(item => item._id);
//       const hasNewItems = addtocartid.some(id => !currentDataIds.includes(id));
//       const hasRemovedItems = currentDataIds.some(id => !addtocartid.includes(id));
      
//       if (hasNewItems || hasRemovedItems || (addtocartid.length !== data.length)) {
//         fetchData(addtocartid, true);
//       }
//     }
//   }, [addtocartid]);

//   // Calculate total whenever data or quantities change
//   useEffect(() => {
//     let total = 0;
//     data.forEach((item) => {
//       const qty = Quantity[item._id] || 1;
//       const price = Number(item?.Discountedprice || 0);
//       total += qty * price;
//     });
//     if (isMounted.current) {
//       setTotalAmount(total);
//     }
//   }, [data, Quantity]);

//   // Increment quantity with optimistic update
//   const increment = async (id) => {
//     const newQuantity = (Quantity[id] || 1) + 1;
    
//     // Update UI immediately (optimistic update)
//     setQuantity((prev) => ({
//       ...prev,
//       [id]: newQuantity,
//     }));

//     try {
//       await instance.put(`/app/details/UpdateQuantity/${id}`, 
//         { quantity: Quantity }, 
//         { withCredentials: true }
//       );
//     } catch (err) {
//       console.error('Error updating quantity:', err);
//       // Revert on error
//       setQuantity((prev) => ({
//         ...prev,
//         [id]: (prev[id] || 1) - 1,
//       }));
//       setError("Failed to update quantity");
//     }
//   };

//   // Decrement quantity with optimistic update
//   const decrement = async (id) => {
//     const currentQty = Quantity[id] || 1;
//     if (currentQty <= 1) return;
    
//     const newQuantity = currentQty - 1;
    
//     // Update UI immediately (optimistic update)
//     setQuantity((prev) => ({
//       ...prev,
//       [id]: newQuantity,
//     }));

//     try {
//       await instance.put(`/app/details/UpdateQuantityminus/${id}`, 
//         { quantity: Quantity }, 
//         { withCredentials: true }
//       );
//     } catch (err) {
//       console.error('Error updating quantity:', err);
//       // Revert on error
//       setQuantity((prev) => ({
//         ...prev,
//         [id]: currentQty,
//       }));
//       setError("Failed to update quantity");
//     }
//   };

//   // Remove cart item with optimistic update
//   const removeCartItem = async (index, id) => {
//     if (!data[index]) return;
    
//     const itemId = data[index]._id;
    
//     // Store original state for reverting on error
//     const originalData = [...data];
//     const originalIds = [...addtocartid];
//     const originalQuantities = { ...Quantity };
    
//     // Update UI immediately (optimistic update)
//     const updatedData = data.filter((_, i) => i !== index);
//     const updatedIds = addtocartid.filter((_, i) => i !== index);
//     const newQuantities = { ...Quantity };
//     delete newQuantities[itemId];

//     if (isMounted.current) {
//       setData(updatedData);
//       setAddtocartid(updatedIds);
//       setCart((prev) => Math.max(prev - 1, 0));
//       setQuantity(newQuantities);
//       lastCartLength.current = Math.max(lastCartLength.current - 1, 0);
//     }

//     try {
//       await instance.delete(`/app/details/DeleteTOCatProduct/${id}`, {
//         withCredentials: true,
//       });
      
//       // Trigger global cart update event
//       window.dispatchEvent(new CustomEvent('cartUpdated', { 
//         detail: { action: 'remove', productId: id } 
//       }));
      
//     } catch (err) {
//       console.error("Error deleting:", err);
//       // Revert on error
//       if (isMounted.current) {
//         setData(originalData);
//         setAddtocartid(originalIds);
//         setCart((prev) => prev + 1);
//         setQuantity(originalQuantities);
//         lastCartLength.current = originalIds.length;
//         setError("Failed to remove item");
//       }
//     }
//   };

//   // Loading state
//   if (loading && data.length === 0) {
//     return (
//       <div className="p-4 bg-gray-100 min-h-screen">
//         <div className="flex justify-center items-center h-64">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading cart...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Empty cart state
//   if (!loading && (!addtocartid || addtocartid.length === 0 || data.length === 0)) {
//     return (
//       <div className="p-4 bg-gray-100 min-h-screen">
//         <div className="flex flex-col items-center justify-center h-64">
//           <div className="text-6xl mb-4">🛒</div>
//           <h1 className="text-2xl font-semibold text-gray-600 mb-2">
//             Your cart is empty
//           </h1>
//           <p className="text-gray-500 text-center">
//             Add some products to your cart to see them here!
//           </p>
//           <button 
//             onClick={() => refreshCart()}
//             className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
//           >
//             Refresh Cart
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Shopping Cart ({data.length} items)</h1>
//         <button 
//           onClick={() => refreshCart()}
//           disabled={loading}
//           className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
//         >
//           {loading && <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>}
//           Refresh
//         </button>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
//           <p>{error}</p>
//           <button 
//             onClick={() => setError(null)}
//             className="text-red-500 hover:text-red-700 text-xl"
//           >
//             ×
//           </button>
//         </div>
//       )}

//       {/* Cart Items */}
//       <div className="space-y-6">
//         {data.map((item, index) => (
//           <div
//             key={`${item._id}-${index}`}
//             className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center gap-6 transition-all hover:shadow-lg"
//           >
//             {/* Product Image */}
//             <div className="w-32 h-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
//               <img
//                 src={item.PrimaryImage || '/placeholder-image.png'}
//                 alt={item.title}
//                 className="w-full h-full object-contain"
//                 onError={(e) => {
//                   e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA2NEw2NCA0MEw4OCA2NEw2NCA4OEw0MCA2NFoiIGZpbGw9IiNEMUQ1REIiLz4KPC9zdmc+';
//                 }}
//               />
//             </div>

//             {/* Product Details */}
//             <div className="flex-1">
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 {item.title || 'Product Title'}
//               </h2>
//               <div className="flex items-center gap-4 mb-2">
//                 <span className="text-lg font-bold text-green-600">
//                   ₹{item.Discountedprice || 0}
//                 </span>
//                 {item.Originalprice && item.Originalprice !== item.Discountedprice && (
//                   <span className="text-gray-500 line-through">
//                     ₹{item.Originalprice}
//                   </span>
//                 )}
//               </div>
              
//               {/* Quantity Controls */}
//               <div className="flex items-center space-x-4 mt-3">
//                 <span className="text-gray-600">Quantity:</span>
//                 <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-1">
//                   <button
//                     onClick={() => decrement(item._id)}
//                     disabled={loading || (Quantity[item._id] || 1) <= 1}
//                     className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:text-gray-500 text-white w-8 h-8 rounded-full font-bold transition-colors flex items-center justify-center"
//                   >
//                     -
//                   </button>
//                   <span className="text-lg font-medium min-w-[3rem] text-center bg-white px-3 py-1 rounded">
//                     {Quantity[item._id] || 1}
//                   </span>
//                   <button
//                     onClick={() => increment(item._id)}
//                     disabled={loading}
//                     className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:text-gray-500 text-white w-8 h-8 rounded-full font-bold transition-colors flex items-center justify-center"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Item Total */}
//               <div className="mt-3 text-lg font-semibold text-gray-800">
//                 Subtotal: ₹{((Quantity[item._id] || 1) * Number(item.Discountedprice || 0)).toFixed(2)}
//               </div>
//             </div>

//             {/* Remove Button */}
//             <div className="flex flex-col items-center">
//               <button
//                 onClick={() => removeCartItem(index, item._id)}
//                 disabled={loading}
//                 className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
//               >
//                 <span>Remove</span>
//                 <span className="text-lg">×</span>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Cart Summary */}
//       <div className="mt-8 bg-white rounded-lg shadow-md p-6 sticky bottom-4">
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <p className="text-gray-600">Total Items: {data.length}</p>
//             <p className="text-gray-600">Total Quantity: {Object.values(Quantity).reduce((sum, qty) => sum + (qty || 0), 0)}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-gray-600">Total Amount</p>
//             <p className="text-3xl font-bold text-green-600">₹{totalAmount.toFixed(2)}</p>
//           </div>
//         </div>
        
//         <div className="flex gap-4">
//           <button 
//             onClick={() => window.history.back()}
//             className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
//           >
//             Continue Shopping
//           </button>
//           <button 
//             className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
//             disabled={data.length === 0 || loading}
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;