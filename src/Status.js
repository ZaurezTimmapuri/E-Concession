import React from 'react';
import './Status.css';
import './Sidebar.css'
import { Link, useNavigate } from 'react-router-dom';
import { fireapp } from './firebase'; // Assuming `fireapp` is your Firebase app instance

function Status() {
  const navigate = useNavigate();

  // Function to handle signout
  const handleSignOut = async () => {
    try {
      await fireapp.auth().signOut(); // Sign out the user
      navigate('/'); // Navigate to the home page after signout
    } catch (error) {
      console.error('Sign out failed:', error.message);
    }
  };

  const handleViewpass = () => {
    // Redirect to another PDF or perform some other action
    window.open('https://firebasestorage.googleapis.com/v0/b/e-concession.appspot.com/o/zaurez%2FConcession.jpeg?alt=media&token=3dd21c35-74bc-4885-8531-36d6d1980196', '_blank');
  };


  return (
    <div className="sidebar">
      <Link to="/UserDash" className="sidebar-button">
        Dashboard 
      </Link>
      <Link to="/Profileinformation" className="sidebar-button">
        Update Profile 
      </Link>
      <Link to="/UserVerify" className="sidebar-button">
        Verification Status
      </Link>
      <Link to="/Applicationform" className="sidebar-button">
        Application Form
      </Link>
      <Link to="/Status" className="sidebar-button">
        Concession Status
      </Link>
      <button type="button" className="signout-button" onClick={handleSignOut}>
        Sign out
      </button>

      <div className="text-box-Status">
        <h1>Application Status</h1>

        <table style={{ width: '1125px', border: '1px solid black', marginTop: '135px' }}>
          <thead>
            <tr>
              <th style={{ width: '375px', border: '3px solid black', height: '70px', textAlign: 'center' }}>Application ID</th>
              <th style={{ width: '375px', border: '3px solid black', height: '70px', textAlign: 'center' }}>Status</th>
              <th style={{ width: '375px', border: '3px solid black', height: '70px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ width: '375px', border: '3px solid black', height: '70px', textAlign: 'center' }}>2241481321</td>
              <td style={{ width: '375px', border: '3px solid black', height: '70px', textAlign: 'center', color: 'green' }}>In Progress</td>
              <td style={{ width: '375px', border: '3px solid black', height: '70px', textAlign: 'center' }}>
                  <button onClick={handleViewpass} style={{ backgroundColor: 'green', color: 'white', margin: '10px', padding: '15px' }}>
                    Redeem
                  </button>
                <Link to="/Applicationform">
                  <button style={{ backgroundColor: 'red', color: 'white', padding: '15px' }}>
                    Reapply
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Status;
