// import React from 'react'
// import { useContext } from 'react'
// import { UserContext } from './UserContext'
// import { useEffect } from 'react'
// import { instance } from '../axios'
// import { useState } from 'react'

// function Wishlist() {
//     const {AddtoWishlist}=useContext(UserContext)
//     let [Wishlistid,setWishlistid]=useState([])
//     let [product,setProduct]=useState([])
//     console.log(AddtoWishlist)
//     useEffect(()=>{
//   let fetchdataid=async()=>{
//     try {
//       let res=await instance.get("/app/details/addedtoallWishlist",{withCredentials:true}) 
//       setWishlistid(res.data.wishlist)
//     } catch(err) {
//       console.log('Wishlist:',err)
//     }
//   }
//   fetchdataid()
// },[])


// useEffect(()=>{
//   if(Wishlistid.length > 0){
//     fetchalldata()
//   }
// },[Wishlistid])

// async function fetchalldata(){
//   try {
//     let result = await Promise.all(
//       Wishlistid.map(async(id)=> {
//         let res=await instance.get('/app/detail/get/'+ id ,{withCredentials:true})
//         return res.data
//       })
//     )
//     console.log("Final Wishlist Products:", result)
//     setProduct(result)
//   } catch(err) {
//     console.log("fetchalldata error:", err)
//   }
// }

//     console.log(product)
//   return (
//     <div>
//          {   product.map(item=>(
//                 <>
//                   <div>
//                        <img src={item.PrimaryImage} alt="" />
//                   </div>
//                   <div>
//                       <h2>{item.name}</h2>
//                       <h3>{item.slug}</h3>
//                   </div>
//                 </>
//          ))

//          }
//     </div>
//   )
// }

// export default Wishlist


import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import { instance } from '../axios'

function Wishlist() {
  const { AddtoWishlist } = useContext(UserContext)
  let [Wishlistid, setWishlistid] = useState([])
  let [product, setProduct] = useState([])

  useEffect(() => {
    let fetchdataid = async () => {
      try {
        let res = await instance.get("/app/details/addedtoallWishlist", { withCredentials: true })
        setWishlistid(res.data.wishlist)
      } catch (err) {
        console.log('Wishlist:', err)
      }
    }
    fetchdataid()
  }, [])

  useEffect(() => {
    if (Wishlistid.length > 0) {
      fetchalldata()
    }
  }, [Wishlistid])

  async function fetchalldata() {
    try {
      let result = await Promise.all(
        Wishlistid.map(async (id) => {
          let res = await instance.get('/app/detail/get/' + id, { withCredentials: true })
          return res.data
        })
      )
      setProduct(result)
    } catch (err) {
      console.log("fetchalldata error:", err)
    }
  }
  console.log(Wishlistid,product)
async  function remove(id){
     console.log(id)
     try{
       let res=await instance.delete('/app/details/DeleteTOWishlist/'+id,{withCredentials:true})
       console.log(res)
    setWishlistid( Wishlistid.filter(item=>item!==id))      
    setProduct(product.filter(item=>item._id!==id))

     }catch(err){
        console.log("whislist Delete error:",err)
     }

  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        My Wishlist ({product.length})
      </h1>

      {product.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          <p>Your wishlist is empty</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {product.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-sm flex items-center">
              {/* Image */}
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={item.PrimaryImage}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Details */}
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-medium text-gray-800">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.slug}</p>
                {item.price && (
                  <p className="text-sm font-semibold text-gray-700 mt-1">
                    ₹{item.price}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600" onClick={()=>remove(item._id)}>
                  Remove
                </button>
                {/* <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">
                  Remove
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist
