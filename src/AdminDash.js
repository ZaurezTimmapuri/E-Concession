import React from 'react';
import './AdminDash.css';
import './Sidebar.css'
import { Link , useNavigate} from 'react-router-dom';
import { fireapp} from './firebase';


function AdminDash() {

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await fireapp.auth().signOut(); // Sign out the user
      navigate('/'); // Navigate to the home page after signout
    } catch (error) {
      console.error('Sign out failed:', error.message);
    }
  };



  return (
            <div className="sidebar">
              <Link to="/AdminDash" className="sidebar-button">
              Dashboard
            </Link>
              <Link to="/AdminProfiles" className="sidebar-button">
              Profiles Verify
            </Link>
            <Link to="/AdminConcessionapp" className="sidebar-button">
              Concession Applications
            </Link>
            {/* <Link to="/AdminConcessionreview" className="sidebar-button">
              Concession History
            </Link> */}            
    <button onClick={handleSignOut} className="signout-button"> 
      Sign Out
    </button>

    <div className='text-box-admin '></div>


  </div>
  )
}

export default AdminDash