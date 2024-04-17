import React, { useState , useEffect  } from 'react';
import {fireapp , firestore} from './firebase'
import "./Login.css"
import { Link , Navigate  } from 'react-router-dom';


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    fireapp.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setIsLoggedIn(true);
        checkAdminStatus(user.uid);
      } else {
        // User is signed out.
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    });
  }, []);

  const checkAdminStatus = async (uid) => {
    const userDoc = await firestore.collection('users').doc(uid).get();
    if (userDoc.exists && userDoc.data().is_admin === 1) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await fireapp.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Check if user is admin
      checkAdminStatus(user.uid);
    } catch (error) {
      // Handle login errors
      console.error('Login failed:', error.message);
    }
  };

  if (isLoggedIn) {
    return <Navigate to={isAdmin ? '/AdminDash' : '/UserDash'} />;
                                    // yes             no
}

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
          <button type="button">Login</button>
        </div>
      </form>
    </div>
  );
}


