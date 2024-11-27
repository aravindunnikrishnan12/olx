import React, { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import "./Login.css";
import { FirebaseContext } from "../../store/FirebaseContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Popup from "../pop/pop";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState(""); // For error messages
  const navigate = useNavigate();

  const { auth } = useContext(FirebaseContext);

  const handleLogin = (e) => {
    e.preventDefault();
    setPopupMessage(""); // Clear previous error messages

    if (!auth) {
      setPopupMessage("Firebase authentication is not available.");
      return;
    }

    if (!email || !password) {
      setPopupMessage("Please fill out both email and password fields.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Logged in successfully");
        navigate("/");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setPopupMessage("Email not found. Please sign up first.");
        } else if (error.code === "auth/wrong-password") {
          setPopupMessage("Incorrect password. Please try again.");
        } else {
          setPopupMessage(`Login error: ${error.message}`);
        }
      });
  };

  const closePopup = () => setPopupMessage(""); // Close the popup

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <a href="/signup">Signup</a>
      </div>
      {popupMessage && <Popup message={popupMessage} onClose={closePopup} />} 
    </div>
  );
}

export default Login;
