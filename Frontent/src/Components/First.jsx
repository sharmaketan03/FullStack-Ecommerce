import { useState ,useEffect} from "react";
import { UserContext } from "./UserContext";
import { Outlet } from "react-router-dom";
import Header from "./Header"


function First() {
  const [Cart, setCart] = useState(0);
  const [addtocartid, setAddtocartid] = useState([]);
  const [data, setData] = useState([]);
  const [Quantity, setQuantity] = useState({}); 
const [AddtoWishlist,setAddtoWishlist]=useState([])
 const [input,setInput]=useState("")
 const [user,setUser]=useState({})
 
//     window.addEventListener('keydown',(e)=>{   
//       console.log(e.key)
//       if(e.ctrlKey && e.key.toLowerCase() == "r" || e.key=='F5'){
//         e.preventDefault()
//           // console.log('chaalu h')
//           return ""
//       }
//     })
// window.addEventListener('beforeunload', (e) => {
//   e.preventDefault();      // Modern browsers ke liye
//   e.returnValue = '';      // Chrome/Firefox ke liye required
//   // console.log('Page unload requested');
// });
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

    </UserContext.Provider>
  );
}

export default First;