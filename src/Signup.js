import React, { useState , useEffect} from 'react';
import { auth, firestore ,fireapp } from './firebase';
import { Link } from 'react-router-dom'; // Import the Link component from React Router
import './Signup.css'

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // useEffect(() => {
  //   const unsubscribe = fireapp.auth().onAuthStateChanged(async (user) => {
  //     if (user) {
  //       // User is signed in.
  //     } else {
  //       // User is signed out.
  //       // Delete the Firestore document associated with this user if it exists
  //       const userId = fireapp.auth().currentUser?.uid;
  //       if (userId) {
  //         await fireapp.firestore().collection('users').doc(userId).delete();
  //       }
  //     }
  //   });

  //   //Cleanup function to unsubscribe from the listener when component unmounts
  //   return () => unsubscribe();
  // }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const userCredential = await fireapp.auth().createUserWithEmailAndPassword(email, password);
      // User successfully registered
      console.log('User registered:', userCredential.user);
      
      // Add the user UID as a document name under a 'users' collection in Firestore
      await fireapp.firestore().collection('users').doc(userCredential.user.uid).set({
        email: userCredential.user.email,
        // Add more user data if needed
      });
      window.location.href = "/Profileinformation";
    } catch (error) {
      // Handle errors here
      setError(error.message);
    }
  };

    // for deleting documents
    

  return (
    <div className="sign-up-form">
       <img src="./dmce-logo.png" />
      <h2>Sign Up </h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id='email'
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
            </div>

        <div className="form-group">
              <label>Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required/> 

              <span
                className={`password-toggle ${showPassword ? 'show' : ''}`}
                 onClick={handleTogglePasswordVisibility}>
                {showPassword ? 'Hide' : 'Show'}
              </span>

        </div>

        <button type="submit">Sign Up</button>

      </form>
    </div>
  );
}

export default Signup;
