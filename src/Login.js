import React, { useState, useEffect } from 'react';
import { fireapp, firestore } from './firebase';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const unsubscribe = fireapp.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setIsLoggedIn(true);
        checkAdminStatus(user.uid);
      } else {
        // User is signed out.
        setIsLoggedIn(false);
        setIsAdmin(false);
        // Redirect to login page after sign-out
        navigate('/login');
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [navigate]);

  const checkAdminStatus = async (uid) => {
    try {
      const userDoc = await firestore.collection('users').doc(uid).get();
      if (userDoc.exists && userDoc.data().is_admin === 1) {
        setIsAdmin(true);
        // Redirect to AdminDash after login if isAdmin
        navigate('/AdminDash');
      } else {
        setIsAdmin(false);
        // Redirect to UserDash after login if not isAdmin
        navigate('/UserDash');
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await fireapp.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      // Handle login errors
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="login-form">
      <img src="./loginclip.png" alt="Login" />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className={`password-toggle ${showPassword ? 'show' : ''}`}
            onClick={handleTogglePasswordVisibility}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>
        <div>
          <button type="submit">Login</button> {/* Change type to 'submit' */}
        </div>
      </form>
    </div>
  );
}
