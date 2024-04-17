import React from 'react';
import './AdminDash.css';
import './Sidebar.css'
import { Link } from 'react-router-dom';


function AdminDash() {
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
            <Link to="/"> 
            <button type="submit"  className="signout-button" >Sign out</button>
            </Link>
    {/* <button onClick={handleSignOut} className="signout-button"> will be used when dealing with database
      Sign Out
    </button> */}

    <div className='text-box-admin '></div>


  </div>
  )
}

export default AdminDash