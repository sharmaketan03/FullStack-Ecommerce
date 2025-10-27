import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiLogOut,
  FiLogIn,
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiHome,
  FiInfo,
  FiMail,
  FiFileText,
} from "react-icons/fi";
import { UserContext } from "./UserContext";
import { instance } from "../axios";
import toast from "react-hot-toast";

function Header() {
  const { input, setInput, Cart, user, setUser, setCart } =
    useContext(UserContext);
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!user?.role);

  // 🔄 keep login state updated when user context changes
  useEffect(() => {
    setIsLoggedIn(!!user?.role);
  }, [user]);

  // 🧭 Logout function
  async function handleLogout() {
    try {
      await instance.post("/app/details/LogOuttheweb", {}, { withCredentials: true });
      setCart(0);
      setUser({ role: "" });
      setIsLoggedIn(false);
      toast.success("Logout successful!");
      navigate("/login");
    } catch (err) {
      console.log("Logout failed", err);
      toast.error("Logout failed. Try again!");
    }
  }

  const handleLogin = () => {
    toast("Redirecting to login...", { icon: "➡️" });
    navigate("/login");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      {user?.role !== "admin" ? (
        <>
          {/* USER HEADER */}
          <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-xl sticky top-0 z-50 backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 lg:px-8 py-4 max-w-[1400px] mx-auto">
              {/* 🛍️ LOGO */}
              <Link to="/" className="group">
                <h1 className="text-2xl md:text-3xl font-black text-white drop-shadow-lg flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
                  <span className="text-3xl md:text-4xl animate-bounce">🛍️</span>
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Shop</span>
                  <span>Hub</span>
                </h1>
              </Link>

              {/* 🔍 Desktop Search */}
              <div className="hidden lg:flex items-center w-full max-w-xl mx-8">
                <div className="relative w-full group">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3 border-0 rounded-full bg-white shadow-lg focus:ring-4 focus:ring-white/30 focus:shadow-xl transition-all duration-300 text-gray-800 placeholder-gray-400 font-medium"
                    placeholder="Search amazing products..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
              </div>

              {/* 🧭 Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-2">
                <Link 
                  to="/" 
                  className="flex items-center gap-2 text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 font-semibold"
                >
                  <FiHome size={18} />
                  <span>Home</span>
                </Link>
                <Link 
                  to="/about" 
                  className="flex items-center gap-2 text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 font-semibold"
                >
                  <FiInfo size={18} />
                  <span>About</span>
                </Link>
                <Link 
                  to="/contact" 
                  className="flex items-center gap-2 text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 font-semibold"
                >
                  <FiMail size={18} />
                  <span>Contact</span>
                </Link>
                <Link 
                  to="/blog" 
                  className="flex items-center gap-2 text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 font-semibold"
                >
                  <FiFileText size={18} />
                  <span>Blog</span>
                </Link>
                <Link 
                  to="/Wishlist" 
                  className="flex items-center gap-2 text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 font-semibold"
                >
                  <FiHeart size={18} />
                  <span>Wishlist</span>
                </Link>

                {/* 🛒 Cart */}
                <Link 
                  to="/cart" 
                  className="relative text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 ml-2"
                >
                  <FiShoppingCart size={26} />
                  {Cart > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs min-w-[22px] h-[22px] rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {Cart}
                    </span>
                  )}
                </Link>

                {/* 🚪 Login / Logout */}
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 ml-2"
                  >
                    <FiLogOut size={20} />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 ml-2"
                  >
                    <FiLogIn size={20} />
                    <span>Login</span>
                  </button>
                )}
              </nav>

              {/* 📱 Mobile Actions */}
              <div className="lg:hidden flex items-center gap-3">
                <Link 
                  to="/cart" 
                  className="relative text-white hover:bg-white/10 p-2 rounded-full transition-all duration-300"
                >
                  <FiShoppingCart size={26} />
                  {Cart > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs min-w-[20px] h-[20px] rounded-full flex items-center justify-center font-bold shadow-lg">
                      {Cart}
                    </span>
                  )}
                </Link>

                <button
                  onClick={toggleMobileMenu}
                  className="text-white p-2 rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                </button>
              </div>
            </div>

            {/* 🔍 Mobile Search */}
            <div className="lg:hidden px-4 pb-4">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  className="w-full pl-11 pr-4 py-2.5 border-0 rounded-xl bg-white shadow-md focus:ring-2 focus:ring-white/30 text-gray-800 placeholder-gray-400"
                  placeholder="Search products..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
            </div>
          </header>

          {/* 🌈 Decorative Line */}
          <div className="h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 shadow-md"></div>

          {/* 📱 Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white shadow-2xl absolute top-full left-0 right-0 z-40 animate-slideDown">
              <nav className="flex flex-col p-4 space-y-2">
                <Link 
                  to="/" 
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-4 py-3 rounded-xl transition-all duration-300 font-semibold"
                >
                  <FiHome size={20} />
                  <span>Home</span>
                </Link>
                <Link 
                  to="/about" 
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-4 py-3 rounded-xl transition-all duration-300 font-semibold"
                >
                  <FiInfo size={20} />
                  <span>About</span>
                </Link>
                <Link 
                  to="/contact" 
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-4 py-3 rounded-xl transition-all duration-300 font-semibold"
                >
                  <FiMail size={20} />
                  <span>Contact</span>
                </Link>
                <Link 
                  to="/blog" 
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-4 py-3 rounded-xl transition-all duration-300 font-semibold"
                >
                  <FiFileText size={20} />
                  <span>Blog</span>
                </Link>
                <Link 
                  to="/Wishlist" 
                  onClick={toggleMobileMenu}
                  className="flex items-center gap-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 px-4 py-3 rounded-xl transition-all duration-300 font-semibold"
                >
                  <FiHeart size={20} />
                  <span>Wishlist</span>
                </Link>

                <div className="border-t border-gray-200 my-2"></div>

                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <FiLogOut size={20} />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleLogin();
                      toggleMobileMenu();
                    }}
                    className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <FiLogIn size={20} />
                    <span>Login</span>
                  </button>
                )}
              </nav>
            </div>
          )}
        </>
      ) : (
        // ✅ Admin Header
        <>
          <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl sticky top-0 z-50">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-20">
                <Link to={"/"} className="group">
                  <h1 className="text-2xl md:text-3xl font-black text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text group-hover:scale-105 transition-transform duration-300 flex items-center gap-2">
                    <span className="text-3xl">👨‍💼</span>
                    Admin Panel
                  </h1>
                </Link>

                <nav className="flex items-center gap-4">
                  <Link 
                    to={"/"} 
                    className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-300 font-semibold"
                  >
                    <FiShoppingCart size={20} />
                    <span className="hidden md:inline">All Products</span>
                  </Link>
                  <Link 
                    to={"/addProduct"} 
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <span className="text-xl">➕</span>
                    <span className="hidden md:inline">Add Product</span>
                  </Link>

                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <FiLogOut size={20} />
                      <span>Logout</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-5 py-2 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <FiLogIn size={20} />
                      <span>Login</span>
                    </button>
                  )}
                </nav>
              </div>
            </div>
          </header>
          <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 shadow-md"></div>
        </>
      )}
    </>
  );
}

export default Header