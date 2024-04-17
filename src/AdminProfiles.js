import React from 'react'
import { useState , useEffect} from 'react';
import { firestore} from './firebase';
import './AdminProfiles.css'
import './Sidebar.css'
import { Link } from 'react-router-dom';

function AdminProfiles() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const snapshot = await firestore.collection('users').get();
        const applicationData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setApplications(applicationData);
      } catch (error) {
        console.error('Error fetching applications: ', error);
      }
    };

    fetchApplications();
  }, []);


  const [textBoxColor, setTextBoxColor] = useState('');

  const handleAccept = () => {
    setTextBoxColor('lightgreen');
    alert('Application Accpeted!');
   
  };

  const handleReject = () => {
    setTextBoxColor('lightcoral');
    alert('Application Rejected!');
  };

  const handleView = (imageUrl) => {
    // Open the provided image URL in a new tab
    window.open(imageUrl, '_blank');
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
    <Link to="/"> 
        <button type="submit"  className="signout-button" >Sign out</button>
      </Link>
    {/* <button onClick={handleSignOut} className="signout-button"> will be used when dealing with database
      Sign Out
    </button> */}


    <div className="text-box-Admin-profile">
            <h1>Profiles to Verify</h1>
            <div className="container-apply-profile">
          {applications.map(application => (
            <div
              key={application.id}
              className="textbox-apply-profile"
              style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', backgroundColor: textBoxColor }}>
              <div>
              <p className="textbox-header-profile">GR :  {application.grNumber}</p>
              <p className="textbox-header-profile">Name : {application.firstName}</p>
              <p className="textbox-header-profile">Mob : {application.mobileNumber}</p>
              <p className="textbox-header-profile">Address : {application.address}</p>
              </div>
                <div>
                <p className="textbox-header-profile">Branch : {application.branchName}</p>
                <p className="textbox-header-profile">Division :  {application.division}</p>
                <p className="textbox-header-profile">Year :  {application.year}</p>
                </div>
              <div>
              <button className="textbox-button-profile" onClick={() => handleView(application.aadharUrl)}>
                Aadhar
              </button>
              <button className="textbox-button-profile" onClick={() => handleView(application.feeUrl)}>
                Fee Receiept
              </button>
              <div>
              <button className="textbox-button-profile" onClick={() => handleView(application.photoUrl)}>
                Photo 
              </button>
              <button className="textbox-button-profile" onClick={() => handleView(application.idUrl)}>
                ID 
              </button>
              </div>
                <div>
                  <button className="textbox-button-send-profile" onClick={handleAccept}>
                    Accept
                  </button>
                  <button className="textbox-button-send-profile" onClick={handleReject}>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

































      </div>









  </div>
  )
}

export default AdminProfiles