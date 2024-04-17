import React from 'react'
import './UserVerify.css'
import './Sidebar.css'
import { Link } from 'react-router-dom';

function UserVerify() {
  return (
    <div className="sidebar">
      <Link to="/UserDash" className="sidebar-button">
      Dashboard 
      </Link>
      <Link to="/Profileinformation" className="sidebar-button">
        Update profile
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
      <Link to="/"> 
          <button type="submit"  className="signout-button" >Sign out</button>
        </Link>
      {/* <button onClick={handleSignOut} className="signout-button"> will be used when dealing with database
        Sign Out
      </button> */}

        <div className="text-box-verification">
            <h1>Verification Status</h1>
      </div>


    </div>
  )
}

export default UserVerify