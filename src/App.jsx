

// src/App.jsx
// src/App.jsx
import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from './pages/Home';
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import CreatePage from './pages/Create';
import ViewPost from './pages/ViewPost';
import { AuthContext, FirebaseContext } from "./store/FirebaseContext";
import { getAuth } from 'firebase/auth'; 
import PostProvider from "./store/PostContext"; // Updated to use PostProvider

function App() {
  const { setUser } = useContext(AuthContext);
  const { firebaseApp } = useContext(FirebaseContext);
  
  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth state changed:", user); // Log user state changes
      setUser(user);
    });
    return () => unsubscribe();
  }, [firebaseApp, setUser]);

  return (
    <PostProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/view" element={<ViewPost />} />
        </Routes>
      </Router>
    </PostProvider>
  );
}

export default App;
