

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password };
  
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", payload);
      
      setSuccessMessage(response.data.message);
      setErrorMessage("");
  
      const { role, teacherId , name} = response.data; // Get teacherId from response
  
      // Store teacherId in localStorage
      if (teacherId) {
        localStorage.setItem("teacherId", teacherId);
      }
  
      if (name) {
        localStorage.setItem("teacherName", name); // Store teacher's name
      }
      // Redirect based on role
      if (role === "STUDENT") {
        navigate("/student");
      } else if (role === "FACULTY") {
        navigate("/teacher");
      } else {
        setErrorMessage("Unknown role. Please contact support.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.error || "Login failed!");
      setSuccessMessage("");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login to NotesHub</h2>
        
        {/* Display success message */}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        
        {/* Display error message */}
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-primary rounded-md hover:bg-secondary transition-colors"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Don't have an account? <a href="/signup" className="text-primary hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
