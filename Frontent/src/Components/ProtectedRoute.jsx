// import React, { useEffect, useState } from 'react'
// import {instance} from "../axios"
// import { useNavigate } from 'react-router-dom'
// import { useContext } from 'react'
// import { UserContext } from './UserContext'
// function ProtectedRoute({children}) {
//   const [user,setUser]=useState()
  
//  let navigate=useNavigate()
//   const value=async()=> {
//           try{
//                 let response=await instance.get("/app/details/UserAuth",{withCredentials:true})

//                 console.log(response)
//                 setUser(response)
//                 navigate('/cart')
                  
//           }catch(err){
//                 console.log("user don't Login",err)
//                 navigate("/login")
//           }
//   }
//   useEffect(()=>{
//       value()
//   },[])
//   // console.log(user)

//   if(!user){
//     return <div><h1>Loading.....</h1></div>
//   }
//   return user?children:navigate("/login")
  
// }

// export default ProtectedRoute

import React, { useEffect, useState } from 'react';
import { instance } from "../axios";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';

function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // If you want to store user globally

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await instance.get("/app/details/UserAuth", {
          withCredentials: true,
        });
        setUser(response.data); // store user info if needed
        setIsAuthenticated(true);
      } catch (err) {
        console.error("User not logged in", err);
        setIsAuthenticated(false);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [navigate, setUser]);

  if (isLoading) {
    return <div><h1>Loading...</h1></div>;
  }

  if (!isAuthenticated) {
    return null; // Or a fallback UI before navigation happens
  }

  return <>{children}</>;
}

export default ProtectedRoute;
