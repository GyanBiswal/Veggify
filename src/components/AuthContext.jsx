// src/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component to provide auth state to the rest of the app
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
