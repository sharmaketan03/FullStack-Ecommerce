
    
    // import { UserContext } from "./UserContext"
    // import { useContext, useEffect } from "react"
    // import { useState } from "react"
    // import { IoHeart } from "react-icons/io5";
    // import "./index.css";
    // import { Link } from "react-router-dom";
    // import {auth} from "./Firebase"
    // import { useNavigate } from "react-router-dom";


    // function Header() {
    //    const {input,setInput}=useContext(UserContext)
    //    let {Cart}= useContext(UserContext)
    //    let {data} =useContext(UserContext) 
    //    const navigate=useNavigate()
    //    console.log(data)    
    //  async function handel(){
    //       await  auth.signOut()
    //       navigate("/")
    //       console.log("SignOut Successfull")
    //   }
    //   return (
    //       <>
    //        <div className='header'>
    //              <h1><Link to={"/"}>Ecommerce</Link></h1>
                
                    
    //              <nav>
    //                <input type="text"  className="inputwidth" placeholder="search Products With Ecommerce" value={input} onChange={(e)=>setInput(e.target.value)}/>
                  
    //                 <ul className='lists'>
    //                     <li><Link to={"/"}>Home</Link></li>
    //                    <li><Link to={"/about"}>About</Link></li>
    //                    <li><Link to={"/contact"}>Contact</Link></li>
    //                     <li><Link to={"/blog"}>Blog</Link></li>
                      
    //                     <li><Link to={"/cart"}>Cart <span><sup  className="super" >{Cart}</sup></span></Link></li>
    //                     <li onClick={handel}>Logout <span></span></li>

    //                 </ul>
    //              </nav>
    //        </div>
          
    //       </>
    //   )
    // }

    // export default Header





 import { UserContext } from "./UserContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiLogIn, 
  FiLogOut, 
  FiMenu, 
  FiX, 
  FiSearch, 
  FiShoppingCart, 
  FiHome, 
  FiInfo, 
  FiPhone, 
  FiBook 
} from "react-icons/fi";
import { IoHeart } from "react-icons/io5";
import { instance } from "../axios";

function Header() {
  const { input, setInput } = useContext(UserContext);
  const { Cart, data ,user} = useContext(UserContext);

  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log(user)
 async function handleLogout() {
    try {
      let Logout = await instance.post("/app/details/LogOuttheweb", {}, { withCredentials: true });
      console.log(Logout);
      navigate("/login")
    } catch (err) {
      console.log("Donot LogOUt", err);
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
  
     
      {
        "admin"!==user?.role?( <><header className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 shadow-lg sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold text-white">
              <Link to="/" className="hover:text-blue-100 transition-colors">
                🛍️ Ecommerce
              </Link>
            </h1>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center w-1/2 relative">
            <FiSearch className="absolute left-3 text-gray-400" size={20} />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border-0 rounded-full bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all duration-200 placeholder-gray-500"
              placeholder="Search Products..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white/90 hover:text-white transition-colors font-medium">
              Home
            </Link>
            <Link to="/about" className="text-white/90 hover:text-white transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-white/90 hover:text-white transition-colors font-medium">
              Contact
            </Link>
            <Link to="/blog" className="text-white/90 hover:text-white transition-colors font-medium">
              Blog
            </Link>
            <Link to="/Wishlist" className="text-white/90 hover:text-white transition-colors font-medium">
              Wishlist
            </Link>
            
            <Link to="/cart" className="relative text-white/90 hover:text-white transition-colors">
              <FiShoppingCart size={24} />
              {Cart > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {Cart}
                </span>
              )}
            </Link>

            <button
              onClick={handleLogout}
              className="text-white/90 hover:text-red-300 transition-colors p-1 rounded-full hover:bg-white/10"
              title="Logout"
            >
              <FiLogOut size={22} />
            </button>
          </nav>

          {/* Mobile Menu Button & Cart */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Cart Icon */}
            <Link to="/cart" className="relative text-white">
              <FiShoppingCart size={24} />
              {Cart > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {Cart}
                </span>
              )}
            </Link>
            
            {/* Hamburger Menu */}
            <button
              onClick={toggleMobileMenu}
              className="text-white p-1 rounded-md hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border-0 rounded-full bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all duration-200 placeholder-gray-500"
              placeholder="Search Products..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMobileMenu}
        ></div>
        
        <div
          className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-white to-gray-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{ paddingTop: '80px' }} // Account for header height
        >
          <nav className="px-6 py-6 space-y-1">
            {/* Navigation Items */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center space-x-4 py-4 px-4 rounded-xl hover:bg-blue-50 transition-colors group"
            >
              <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                <FiHome className="text-blue-600" size={22} />
              </div>
              <span className="text-gray-800 font-medium text-lg">Home</span>
            </Link>

            <Link
              to="/about"
              onClick={closeMobileMenu}
              className="flex items-center space-x-4 py-4 px-4 rounded-xl hover:bg-purple-50 transition-colors group"
            >
              <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200 transition-colors">
                <FiInfo className="text-purple-600" size={22} />
              </div>
              <span className="text-gray-800 font-medium text-lg">About</span>
            </Link>

            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="flex items-center space-x-4 py-4 px-4 rounded-xl hover:bg-green-50 transition-colors group"
            >
              <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
                <FiPhone className="text-green-600" size={22} />
              </div>
              <span className="text-gray-800 font-medium text-lg">Contact</span>
            </Link>

            <Link
              to="/blog"
              onClick={closeMobileMenu}
              className="flex items-center space-x-4 py-4 px-4 rounded-xl hover:bg-orange-50 transition-colors group"
            >
              <div className="bg-orange-100 p-2 rounded-lg group-hover:bg-orange-200 transition-colors">
                <FiBook className="text-orange-600" size={22} />
              </div>
              <span className="text-gray-800 font-medium text-lg">Blog</span>
            </Link>
  
            

            {/* Divider */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Logout Button */}
            <button
              onClick={() => {
                handleLogout();
                closeMobileMenu();
              }}
              className="flex items-center space-x-4 py-4 px-4 rounded-xl hover:bg-red-50 transition-colors group w-full text-left"
            >
              <div className="bg-red-100 p-2 rounded-lg group-hover:bg-red-200 transition-colors">
                <FiLogOut className="text-red-600" size={22} />
              </div>
              <span className="text-gray-800 font-medium text-lg">Logout</span>
            </button>
          </nav>
        </div>
      </div>
       <div className="h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>
       </>):(
        <>
        <header className="bg-gray-900 shadow-md sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16 items-center">
      
      {/* Logo / Title */}
      <h1 className="text-xl font-bold text-white tracking-wide">
        Admin Panel
      </h1>

      {/* Navigation */}
      <nav className="flex items-center space-x-6">
        <Link 
          to={"/"} 
          className="text-gray-300 hover:text-white font-medium transition-colors"
        >
          All Products
        </Link>
        <Link 
          to={"/addProduct"} 
          className="text-gray-300 hover:text-white font-medium transition-colors"
        >
          Add Product
        </Link>

        {/* Logout Button */}
        <button
          onClick={() => {
            handleLogout();
            closeMobileMenu();
          }}
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors"
        >
          <FiLogOut size={18} />
          <span className="font-medium">Logout</span>
        </button>
      </nav>
    </div>
  </div>

  {/* Gradient line below header */}
  <div className="h-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400"></div>
</header>

       </>
       )
       
      }
     

       
    </>
  );
}

export default Header;