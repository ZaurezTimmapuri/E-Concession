import React, { useState, useEffect } from 'react';
import {fireapp , firestore } from './firebase';
import './AdminProfiles.css';
import './Sidebar.css';
import { Link , useNavigate } from 'react-router-dom';

function AdminProfiles() {
  const [applications, setApplications] = useState([]);
  const [comments, setComments] = useState({});

  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await fireapp.auth().signOut(); // Sign out the user
      navigate('/'); // Navigate to the home page after signout
    } catch (error) {
      console.error('Sign out failed:', error.message);
    }
  };


  const fetchApplications = async () => {

 
    try {
      const snapshot = await firestore.collection('users').where('to_show', '==', 1).get();
      const applicationData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setApplications(applicationData);
    } catch (error) {
      console.error('Error fetching applications: ', error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAccept = async (userId) => {
    try {
      // Update Firestore document to set accept to 1, to_show to 1, and is_verified to 1
      await firestore.collection('users').doc(userId).update({
        accept: 1,
        reject: 0,
        to_show: 0,
        is_verified: 1,
        comment:'No comments'
      });
      alert('Application Accepted!');
      fetchApplications();
    } catch (error) {
      console.error('Error accepting application: ', error);
    }
  };

  const handleReject = async (userId, comment) => {
    try {
      await firestore.collection('users').doc(userId).update({
        accept: 0,
        reject: 1,
        to_show: 0,
        comment: comment || ''
      });
      alert('Application Rejected!');
      fetchApplications();
    } catch (error) {
      console.error('Error rejecting application: ', error);
    }
  };

  const handleView = imageUrl => {
    window.open(imageUrl, '_blank');
  };

  const handleCommentChange = (userId, comment) => {
    setComments(prevState => ({
      ...prevState,
      [userId]: comment
    }));
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
      <button onClick={handleSignOut} className="signout-button">
      Sign Out
    </button>

      <div className="text-box-Admin-profile">
        <h1>Profiles to Verify</h1>
        <div className="container-apply-profile">
          {applications.map(application => (
            <div
              key={application.id}
              className="textbox-apply-profile"
              style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }}>
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
                  <button className="textbox-button-send-profile" onClick={() => handleAccept(application.id)}>
                    Verify
                  </button>
                  <button className="textbox-button-send-profile" onClick={() => handleReject(application.id, comments[application.id])}>
                    Reject
                  </button>
                  <label htmlFor="Comment" className="textbox-header-comment">Comment: </label>
                  <input
                    className="textbox-header-comment"
                    type="text"
                    id="Comment"
                    placeholder="Add comment..."
                    value={comments[application.id] || ''}
                    onChange={e => handleCommentChange(application.id, e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminProfiles;
