import { useState ,useEffect} from "react";
import { UserContext } from "./UserContext";
import { Outlet } from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer";


function First() {
  const [Cart, setCart] = useState(0);
  const [addtocartid, setAddtocartid] = useState([]);
  const [data, setData] = useState([]);
  const [Quantity, setQuantity] = useState({}); 
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
      <Footer/>

    </UserContext.Provider>
  );
}

export default First;