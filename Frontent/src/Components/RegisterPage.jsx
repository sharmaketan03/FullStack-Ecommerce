import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {instance} from "../axios"

function RegisterPage() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
    password: "",
    role: "user",
  });
const [confirmPassword,setConfirmPassword]=useState(null)
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
     console.log(form.password,confirmPassword)
    if (form.password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {       
      const response = await instance.post(
        "app/details/register",form);

      console.log("Registration successful", response.data);
      toast.success("Registered successfully");

      if (response.data) {
        console.log("register")
        setForm({
          firstname: "",
          lastname: "",
          gender: "",
          email: "",
          password: "",
                  
        });
        setConfirmPassword(null)
        navigate("/login");
      }
    } catch (error) {
      console.error(
        "Registration failed",
        error.response?.data || error.message
      );
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:ring-blue-400"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" required className="accent-blue-600" />
            <label className="text-sm">
              I agree to the{" "}
              <a href="#" className="text-blue-500 underline">
                Terms of Service
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
