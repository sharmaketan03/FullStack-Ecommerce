import { useState ,useEffect} from "react";
import { UserContext } from "./UserContext";
import { Outlet } from "react-router-dom";
import Header from "./Header"


function First() {

  const storedAddtoCartID=JSON.parse(localStorage.getItem("addtoCartId"))||[]
  const StoredQuantity=JSON.parse(localStorage.getItem("quantity"))||{}


  const [Cart, setCart] = useState(storedAddtoCartID.length);
  const [addtocartid, setAddtocartid] = useState(storedAddtoCartID);
  const [data, setData] = useState([]);
  const [Quantity, setQuantity] = useState(StoredQuantity); 
const [AddtoWishlist,setAddtoWishlist]=useState([])
 const [input,setInput]=useState("")
 const [user,setUser]=useState({})
 

useEffect(()=>{
   let savedvalue=localStorage.getItem("role")
   let role1=JSON.parse(savedvalue)
   console.log(role1)
   if(role1){
      setUser({role:role1})
   }
},[])

useEffect(()=>{
   localStorage.setItem("addtoCartId",JSON.stringify(addtocartid))
},[addtocartid])
useEffect(()=>{
   localStorage.setItem("quantity",JSON.stringify(Quantity))
},[Quantity])



console.log(addtocartid)
  return (
    <UserContext.Provider
      value={{
        Cart,
        setCart,
        addtocartid,
        setAddtocartid,
        data,
        setData,
        Quantity,       
        setQuantity,
        AddtoWishlist,
        setAddtoWishlist,
        input,
        setInput,
        user,
        setUser
      }}
    >
      <Header />
      <Outlet />

    </UserContext.Provider>
  );
}

export default First;
