// src/Pages/Signup.jsx
import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; 
import Popup from '../Popup/Popup';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [popupMessage, setPopupMessage] = useState('');

  const { auth, firestore } = useContext(FirebaseContext);

  const validateForm = () => {
    if (!username || !email || !phone || !password) {
      return 'All fields are required.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Invalid email address.';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    if (!/^\d{10}$/.test(phone)) {
      return 'Phone number must be exactly 10 digits.';
    }
    if (/[\s\W_]/.test(username)) {
      return 'Username cannot contain spaces or special characters.';
    }
    return ''; 
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopupMessage('');
  
    const validationError = validateForm();
    if (validationError) {
      setPopupMessage(validationError);
      return;
    }
  
    try {
      // Try to create a new user with the email and password
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's profile with their username
      await updateProfile(result.user, { displayName: username });
      
      // Add user data to Firestore
      await addDoc(collection(firestore, 'users'), {
        id: result.user.uid,
        username: username,
        phone: phone,
      });
  
      // Redirect to login page after successful signup
      navigate('/login');
    } catch (error) {
      // Check if the error is because the email is already in use
      if (error.code === 'auth/email-already-in-use') {
        setPopupMessage('Email already in use. Please log in or use a different email.');
      } else {
        setPopupMessage('Signup error: ' + error.message);
      }
    }
  };
  

  const closePopup = () => setPopupMessage('');

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
      {popupMessage && <Popup message={popupMessage} onClose={closePopup} />} 
    </div>
  );
}
