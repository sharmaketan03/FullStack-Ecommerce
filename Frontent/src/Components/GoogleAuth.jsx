import React from 'react'
import {GoogleLogin} from "@react-oauth/google"
import { instance } from '../axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext'
import { useContext } from 'react-router-dom'
function GoogleAuth() {
  const {user,setUser}=useContext(UserContext)
  let navigate=useNavigate()

   
    const handelogin=async(response)=>{
              const googletoken=response.credential
              console.log("googletoken:",googletoken)
        try{
           let res=await instance.post('/app/details/auth/google',{token:googletoken})
           console.log(res)
           if(res.status==200){
            setUser({role:res.data.role})
            navigate('/')
           }else{
            setUser({role:''})
           }
        }catch(err){
             console.log('GoogleAuth',err)
        }
    }
  return (
    <>
  
    <GoogleLogin   onSuccess={handelogin}
    onError={()=>{console.log("Login Failed")}}
     
    />
    </>
  )
}

export default GoogleAuth