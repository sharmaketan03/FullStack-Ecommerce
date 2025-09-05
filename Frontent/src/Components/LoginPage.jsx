import React, { useContext, useState } from "react";
import { useNavigate, Link, useLocation, useSearchParams, replace } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";
import { instance } from "../axios";
import GoogleAuth from "./GoogleAuth";

import ReactDOM from "react-dom/client"
import { GoogleOAuthProvider } from "@react-oauth/google";


function LoginPage() {
   
  const [form, setForm] = useState({ email: "", password: "",role:"user" });
  
  const {signIn,setSignIn,user,setUser}=useContext(UserContext)
  const navigate = useNavigate();
  let location=useLocation()
  console.log(location.pathname)
  let [searhparams]=useSearchParams()
   let path=searhparams.get("refere")||"/"
  
  const handleChange = (e) => {
     e.preventDefault()
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
// console.log("workimg");

    try{
        const response=await instance.post("app/details/userlogin",form,{withCredentials:true})
        

        console.log("successfully Login",response)
        localStorage.setItem("role",JSON.stringify(response.data.role))
        let savedrole=localStorage.getItem("role")
        let role1=JSON.parse(savedrole)
        if(role1=="user"){
            setUser({role:role1})
              navigate("/")
            console.log(response)
            // setSignIn(response.data)
          setForm({
            email:"",
            password:""
          })
        
        }else{
             setUser({role:role1})
             navigate("/")
        }

    }catch(error){
          console.log("unsuccessfull",error)
    }
  };
  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID)
  return (
    <>
   
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
     
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          <GoogleOAuthProvider  clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <GoogleAuth/>
    </GoogleOAuthProvider>
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium underline">
            Register
          </Link>
        </p>
     
      </div>
      
    </div>
    </>
  );
}

export default LoginPage;
