

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  // Check if the user is logged in (either student or teacher)
  const studentId = localStorage.getItem("studentId");
  const teacherId = localStorage.getItem("teacherId");

  useEffect(() => {
    // Prioritize student redirection first
    if (studentId) {
      navigate("/student");
    } else if (teacherId) {
      navigate("/teacher");
    }
  }, [navigate, studentId, teacherId]);
  

  const handleGetStarted = () => {
    // Redirect based on the logged-in role
    if (studentId) {
      navigate("/student");
    } else if (teacherId) {
      navigate("/teacher");
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Share Your Knowledge</span>
            <span className="block text-primary">With NotesHub</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            The perfect platform for students to share and access high-quality study notes.
            Join our community today!
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button
                onClick={handleGetStarted} // Dynamically handle redirection
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-secondary md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
