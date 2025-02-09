
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [facultyCode, setFacultyCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, email, password, role, facultyCode };

    setErrorMessage(''); // Reset error message on new submission
    setSuccessMessage(''); // Reset success message

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', userData);

      if (response.data === 'Invalid Faculty Code!') {
        // If the faculty code is invalid, set an error message
        setErrorMessage('Invalid Faculty Code! Please try again.');
      } else {
        // Set success message and clear error message
        setSuccessMessage(response.data);
        navigate('/login'); // Redirect to login page
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.error || 'Signup failed! Please check your inputs and try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up to NotesHub</h2>

        {/* Display success message */}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

        {/* Display error message */}
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

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

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="STUDENT">Student</option>
              <option value="FACULTY">Faculty</option>
            </select>
          </div>

          {/* Show faculty code input only if role is Faculty */}
          {role === 'FACULTY' && (
            <div>
              <label htmlFor="facultyCode" className="block text-sm font-medium text-gray-700">Faculty Code</label>
              <input
                type="text"
                id="facultyCode"
                value={facultyCode}
                onChange={(e) => setFacultyCode(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-primary rounded-md hover:bg-secondary transition-colors"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-primary hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
