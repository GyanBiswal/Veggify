import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './Firebase'; 
import { setDoc, doc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Get the created user

      console.log(user);

      // Save user details to Firestore
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: name,
        });
        toast.success("User registered successfully!");
      }
    } catch (error) {
      console.error(error.message);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-900">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            aria-label="Name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            type="text"
            required
          />
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
            Sign Up
          </button>

          <div className="text-center text-sm text-gray-600">
            Already registered?{" "}
            <a
              href="/"
              className="text-blue-500 hover:underline"
            >
              Sign In
            </a>
          </div>
        </form>
      </div>
      {/* Toast Container for displaying messages */}
      <ToastContainer />
    </div>
  );
}

export default SignUpForm;
