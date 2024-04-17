import React from 'react'
import './Navbar.css'
import {Link} from "react-router-dom";

 function navbar () {

  return (
    <div>
         <div className="navbar">
        <div className="logo">
            <img src="./dmce.png" />
        </div>
        <div className='Center'>DMCE-CONCESSIONS</div>
        <ul className="menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Login">Login</Link></li>
            <li><Link to="/About us">About Us</Link></li>
            <li><Link to="/Contact us">Contact Us</Link></li>
        </ul>
    </div>
    </div>
  )
}
export default navbar;