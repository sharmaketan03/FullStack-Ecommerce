import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiLogOut,
  FiLogIn,
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingCart,
  FiHome,
  FiInfo,
  FiPhone,
  FiBook,
} from "react-icons/fi";
import { UserContext } from "./UserContext";
import { instance } from "../axios";

function Header() {
  const { user, setUser, input, setInput } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await instance.post("/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-md z-[1000]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl text-yellow-300">🛍️</span>
          <h1 className="text-xl font-bold flex items-center">
            <span className="text-yellow-400">Shop</span> Hub
          </h1>
        </Link>

        {/* 🔍 Search (Desktop) */}
        <div className="hidden md:flex items-center bg-white/20 rounded-full px-3 py-1 w-1/3">
          <FiSearch className="text-white mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent placeholder-white focus:outline-none w-full text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)} // updates global input
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 font-medium">
          <Link to="/" className="hover:text-yellow-300 flex items-center">
            <FiHome className="mr-1" /> Home
          </Link>
          <Link to="/about" className="hover:text-yellow-300 flex items-center">
            <FiInfo className="mr-1" /> About
          </Link>
          <Link to="/contact" className="hover:text-yellow-300 flex items-center">
            <FiPhone className="mr-1" /> Contact
          </Link>
          <Link to="/wishlist" className="hover:text-yellow-300 flex items-center">
            <FiBook className="mr-1" />Wishlist
          </Link>
          <Link to="/cart" className="hover:text-yellow-300 flex items-center">
            <FiShoppingCart className="mr-1" /> Cart
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="hover:text-red-300 flex items-center"
            >
              <FiLogOut className="mr-1" /> Logout
            </button>
          ) : (
            <Link to="/login" className="hover:text-green-300 flex items-center">
              <FiLogIn className="mr-1" /> Login
            </Link>
          )}
        </nav>

        {/*  Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-white focus:outline-none"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/*  Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white text-gray-800 rounded-b-xl shadow-lg mx-3 mt-2 mb-2 py-3">
          {/* Search (Mobile) */}
          <div className="flex items-center bg-gray-100 rounded-md mx-3 px-3 py-2 mb-3">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent focus:outline-none w-full"
              value={input}
              onChange={(e) => setInput(e.target.value)} // 👈 same global state
            />
          </div>

          {/* Links */}
          <nav className="flex flex-col space-y-2 px-4">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center hover:text-blue-600"
            >
              <FiHome className="mr-2" /> Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="flex items-center hover:text-blue-600"
            >
              <FiInfo className="mr-2" /> About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center hover:text-blue-600"
            >
              <FiPhone className="mr-2" /> Contact
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="flex items-center hover:text-blue-600"
            >
              <FiBook className="mr-2" /> Wishlist
            </Link>
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center hover:text-blue-600"
            >
              <FiShoppingCart className="mr-2" /> Cart
            </Link>

            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center text-red-600 hover:text-red-700"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <FiLogIn className="mr-2" /> Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
