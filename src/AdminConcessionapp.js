import React from 'react'
import { useState , useEffect} from 'react';
import { firestore} from './firebase';
import './Sidebar.css'
import './AdminConcessionapp.css'
import verified from './tick.png'
import pending from './pending.png'
import { Link } from 'react-router-dom';

function AdminConcessionapp() {
  
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const snapshot = await firestore.collection('Applications').get();
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

      <div className="text-box-Admin">
        <h1>Pending Concessions</h1>
        <div className="container-apply">
          {applications.map(application => (
            <div
              key={application.id}
              className="textbox-apply"
              style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)', backgroundColor: textBoxColor }}
            >
              <div>
                <img src={pending} className="textbox-image" alt="verified" />
              </div>
              <div>
              <p className="textbox-header">GR NO:  {application.grNumber}</p>
                <p className="textbox-header">Name : {application.name}</p>
                <p className="textbox-header">Gender : {application.gender}</p>
              </div>
              <br/> 
                <div>
                <p className="textbox-header">Type :  {application.Type}</p>
                <p className="textbox-header">Issued :{application.duration}</p>
                <p className="textbox-header">From :  {application.destination}</p>

                </div>
                <br/>
              <div>
              <button className="textbox-button" onClick={() => handleView(application.feeReceiptImageUrl)}>
                Fee Receipt
              </button>
              <button className="textbox-button" onClick={() => handleView(application.previousPassImageUrl)}>
                Previous Pass
              </button>
              <div>
              <button className="textbox-button" onClick={() => handleView(application.idImageUrl)}>
                ID 
              </button>
              <button className="textbox-button" onClick={() => handleView(application.idImageUrl)}>
                Template 
              </button>
              </div>
                <div>
                  <button className="textbox-button-send" onClick={handleAccept}>
                    Accept
                  </button>
                  <button className="textbox-button-send" onClick={handleReject}>
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

export default AdminConcessionapp ;
