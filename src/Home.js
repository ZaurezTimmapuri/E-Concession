import React from 'react'
import './Home.css'
import {Link} from "react-router-dom";

 function Home() {
  return (
    <div> 
        <div className= "image-section">
            <div className="image-text">
                <div className='heading'>
                Welcome <br/> To <br/> DMCE CONCESSIONS <br/>
                </div>
              <p>Get Railway Concession Online!</p>
              <br/>
              <Link to="/Signup" className="signup-button">Sign Up</Link>
            </div>
          </div>
    
               <br/>

             <div className="announcement-section">
                <div className="announcement-text">
                  <p>Important Announcement: Concessions will be provided only after Admissions.</p>
                 </div>
             </div>


        <div className="text-boxes">
          <div className="text-box-out">
            <div className='heading-notice'>
              Notice
            </div>
            <div>
            <p>Original copy of Fee reciept is to be uploaded
              <br/>
              The scanned image should be readable
              <br/>
              The Reciept uploaded should be of current academic year
              <br/>
              </p>
            </div>
          </div>
          <div className="text-box-out">
          <div className='heading-notice'>
              Notice
            </div>
            <div>
            <p>Provide only masked aadhar for verification
              <br/>
              <a href="https://www.youtube.com/watch?v=CpXwrTwfLwg" target="_blank">How to Generate masked Aadhar</a>
              <br/>
              <a href="https://myaadhaar.uidai.gov.in/genricDownloadAadhaar" target="_blank">Download Generate masked Aadhar</a>
              <br/>
              We are not liable for any loss of Aadhar number
            </p>
            </div>
          </div>
          <div className="text-box-out">
          <div className='heading-notice'>
              Notice
            </div>
            <div>
            <p>One can only issue concession once profile is verified
              <br/>
              Read carefully the Fields asked before uploading
              <br/>
              Concession must be availed within 3 days of issue
            </p>
            </div>
          </div>
        </div>

        <div className="map-view">
          <iframe
          title="Map View"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.
          7967111727576!2d72.99298087520746!3d19.160373882061627!2m3!1f0!2f0!3f0!
          3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bf4daf8967d9%3A0xdd90bed2058f7eaa!2
          sDatta%20Meghe%20College%20Of%20 Engineering!5e0!3m2!1sen!2sin!4v1713338592057!5m2!1sen!2sin"
          width="400"
          height="400"
          style={{ border: '0' }}
          allowFullScreen
          loading="lazy"> 
          </iframe>
       </div>   

    <div className="footer">
      <p>&copy; All rights reserved.</p>
    </div>


    </div>
  )
}
export default Home;