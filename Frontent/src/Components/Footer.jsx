import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin, FiHeart } from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-16 relative overflow-hidden">
      {/* 🌟 Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* 🔹 Main Footer Section */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* 🏪 Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="group inline-block">
              <h2 className="text-3xl font-black text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text group-hover:scale-105 transition-transform duration-300 flex items-center gap-2">
                <span className="text-4xl animate-bounce">🛍️</span>
                <span>ShopHub</span>
              </h2>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Discover quality products at unbeatable prices. Your one-stop destination
              for electronics, fashion, and more.
            </p>
            
            {/* 📱 Social Media Icons */}
            <div className="flex gap-3 pt-2">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-600 to-blue-600 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg hover:shadow-sky-500/50 transition-all duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-700 to-indigo-700 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* ⚙️ Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4 transition-all duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4 transition-all duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4 transition-all duration-300"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4 transition-all duration-300"></span>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* 🧾 Customer Support */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/faq" 
                  className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-4 transition-all duration-300"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/returns" 
                  className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-4 transition-all duration-300"></span>
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link 
                  to="/shipping" 
                  className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-4 transition-all duration-300"></span>
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-4 transition-all duration-300"></span>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* 📞 Contact Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></span>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <FiMail size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <a 
                    href="mailto:Ketan301024@gmail.com" 
                    className="text-sm text-gray-300 hover:text-blue-400 transition-colors break-all"
                  >
                    Ketan301024@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <FiPhone size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone</p>
                  <a 
                    href="tel:+918000054835" 
                    className="text-sm text-gray-300 hover:text-green-400 transition-colors"
                  >
                    +91 8000054835
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 🌈 Decorative Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      {/* 📄 Bottom Copyright Section */}
      <div className="relative bg-gray-950/50 backdrop-blur-sm border-t border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} 
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold mx-1">
                ShopHub
              </span>
              All Rights Reserved  Ketan Sharma.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;