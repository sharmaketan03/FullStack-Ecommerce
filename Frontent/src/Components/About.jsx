

// function About() {
//   return (
   
//     <div className="about">

//         <div>
//           <h1>About Us</h1>
//         </div>
//        <h2>📦 Start Shopping Today!</h2>
//        <p>Whether you're upgrading your wardrobe, hunting for the perfect gadget, or finding home essentials, we’re here to make it all possible—fast, simple, and safe.</p>
//            <div>
//                <h3>Wide Range of Products</h3>
//                <p>From fashion to electronics, home decor to daily essentials—we’ve got something for everyone.</p>
//            </div>
//            <div>
//               <h3>Affordable Prices</h3>
//               <p>Get the best deals without compromising on quality.</p>
//            </div>
//            <div>
//               <h3>Secure Shopping</h3>
//               <p>Shop with confidence through our encrypted and safe checkout process.</p>
//            </div>

//             <div>
//               <h3>Fast & Reliable Delivery</h3>
//               <p>Get your orders delivered quickly, right to your doorstep.</p>
//            </div>
//             <div>
//               <h3>Customer-Centric Support</h3>
//               <p>Our team is here to help you, always—before, during, and after your purchase.</p>
//            </div>
//     </div>
    
//   )
// }

// export default About

import React from 'react'
import { ShoppingBag, Shield, Truck, Headphones, Tag, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

function About() {
  const features = [
    {
      icon: <ShoppingBag className="w-8 h-8 text-blue-600" />,
      title: "Wide Range of Products",
      description: "From fashion to electronics, home decor to daily essentials—we've got something for everyone.",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: <Tag className="w-8 h-8 text-green-600" />,
      title: "Affordable Prices",
      description: "Get the best deals without compromising on quality.",
      color: "bg-green-50 border-green-200"
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Secure Shopping",
      description: "Shop with confidence through our encrypted and safe checkout process.",
      color: "bg-purple-50 border-purple-200"
    },
    {
      icon: <Truck className="w-8 h-8 text-orange-600" />,
      title: "Fast & Reliable Delivery",
      description: "Get your orders delivered quickly, right to your doorstep.",
      color: "bg-orange-50 border-orange-200"
    },
    {
      icon: <Headphones className="w-8 h-8 text-pink-600" />,
      title: "Customer-Centric Support",
      description: "Our team is here to help you, always—before, during, and after your purchase.",
      color: "bg-pink-50 border-pink-200"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      {/* <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            About Us ✨
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner for all your shopping needs
          </p>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Call to Action Section */}
        <div className="text-center mb-16">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              📦 Start Shopping Today!
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-8">
              Whether you're upgrading your wardrobe, hunting for the perfect gadget, or finding home essentials, we're here to make it all possible—fast, simple, and safe.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              <Link to={"/"}>Shop Now 🛍️</Link>
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Us? 🌟
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${feature.color} rounded-2xl p-6 border-2 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer`}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Achievements 🏆
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-600">Products Sold</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">99%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 md:p-12 border border-gray-100">
          <Star className="w-16 h-16 text-yellow-500 mx-auto mb-6 fill-yellow-500" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Join our growing community of satisfied customers who trust us for their shopping needs every day.
          </p>
          <div className="flex justify-center items-center gap-2 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-500" />
            ))}
            <span className="ml-2 text-gray-600 font-semibold">4.8/5 Average Rating</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About