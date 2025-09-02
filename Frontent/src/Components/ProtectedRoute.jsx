import React, { useEffect, useState } from 'react'
import {instance} from "../axios"
import { useNavigate } from 'react-router-dom'
function ProtectedRoute({children}) {
  const [user,setUser]=useState()
  
 let navigate=useNavigate()
  const value=async()=> {
          try{
                let response=await instance.get("/app/details/UserAuth",{withCredentials:true})

                console.log(response)
                setUser(response)
                // navigate('/')
                  
          }catch(err){
                console.log("user don't Login",err)
                navigate("/login")
          }
  }
  useEffect(()=>{
      value()
  },[])
  // console.log(user)

  if(!user){
    return <div><h1>Loading.....</h1></div>
  }
  return user?children:navigate("/login")
  
}

export default ProtectedRoute