// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginForm from './components/LoginForm'; 
// import SignUpForm from './components/SignupForm'; 
// import Profile from './components/Profile';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginForm />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/signup" element={<SignUpForm />} />
//         <Route path="/profile" element={<Profile />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm.jsx';
import SignUpForm from './components/SignupForm.jsx';
import Profile from './components/Profile.jsx';
import Sidebar from './components/Sidebar.jsx';
import Recipes from './components/Recipes.jsx';
import { auth, db } from "./components/Firebase.jsx";
import Bookmarks from './components/Bookmarks.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Set up an authentication state observer
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setIsLoggedIn(true);
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
    });

    // Clean up the observer on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="flex">
        {isLoggedIn && (
          <div className="fixed h-screen w-72">
            <Sidebar />
          </div>
        )}
        <div className={`flex-1 ${isLoggedIn ? 'ml-72' : ''}`}>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/recipes" element={<Recipes/>} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            {isLoggedIn && (
              <Route path="/profile" element={<Profile />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
