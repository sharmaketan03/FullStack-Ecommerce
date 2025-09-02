import React from "react";

function Blog() {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 text-center">
          📝 Top Products 2025
        </h2>
        <ul className="list-disc list-inside space-y-4 text-gray-800 text-lg">
          <li>🧺 Best-Selling Products of the Month</li>
          <li>👕 2025 Fashion Trends You Can’t Miss</li>
          <li>💻 Tech Essentials Every Student Should Own</li>
          <li>🎁 Gift Guide for Every Occasion</li>
          <li>♻️ How We Pack Sustainably</li>
        </ul>
      </div>
    </div>
  );
}

export default Blog;
