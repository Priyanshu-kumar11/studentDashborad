import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // For handling authentication errors

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username && password) {
      const auth = getAuth();
      try {
        // Firebase Authentication for login
        await signInWithEmailAndPassword(auth, username, password);

        // Check if the user is authenticated
        const user = auth.currentUser;
        if (user) {
          // Navigate to student list
          navigate('/studentList');
        }
      } catch (err) {
        // Handle Firebase login errors
        setError('Invalid credentials, please try again');
      }
    } else {
      alert('Please fill in both fields');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="email" // Changed to email for Firebase compatibility
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account? 
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
