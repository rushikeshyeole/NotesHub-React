
import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const navigate = useNavigate();

  // Check if user is logged in (either teacher or student)
  const isLoggedIn = localStorage.getItem("teacherId") || localStorage.getItem("studentId");

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("teacherId");
    localStorage.removeItem("studentId");
    navigate("/"); // Redirect to home/login page
  };

  return (
    <nav className="bg-gradient-to-r from-blue-400 to-indigo-400 shadow-lg fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo - Shifted to the left */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Conditional Buttons - Shifted to the right */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <button
                  className="px-4 py-2 text-white hover:text-gray-200 transition-colors font-medium"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 hover:text-blue-700 transition-colors font-medium shadow-md"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;