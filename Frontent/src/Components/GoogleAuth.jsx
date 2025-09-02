import React from 'react'
import {GoogleLogin} from "@react-oauth/google"
import { instance } from '../axios'
import { useNavigate } from 'react-router-dom'
function GoogleAuth() {
  let navigate=useNavigate()
    const handelogin=async(response)=>{
              const googletoken=response.credential
              console.log("googletoken:",googletoken)
        try{
           let res=await instance.post('/app/details/auth/google',{token:googletoken},{withCredentials:true})
           console.log(res)
           if(res.status==200){
            navigate('/')
           }
        }catch(err){
             console.log('GoogleAuth',err)
        }
    }
  return (
    <>
    <div>GoogleAuth</div>
    <GoogleLogin   onSuccess={handelogin}
    onError={()=>{console.log("Login Failed")}}
    />
    </>
  )
}

export default GoogleAuth