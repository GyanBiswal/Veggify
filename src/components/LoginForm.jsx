import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use useNavigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile'); // Redirect to profile page after successful login
    } catch (error) {
      console.error("Error signing in:", error.code, error.message);
      toast.error("Failed to sign in. Please check your email and password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-900">
          Sign In
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            aria-label="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            type="email"
            required
          />
          <input
            aria-label="Password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />

          <button
            type="submit"
            className="w-full p-3 mb-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Sign In
          </button>

          <div className="text-center text-sm text-gray-600">
            New user?{" "}
            <a
              href="/signup"
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </a>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default LoginForm;
