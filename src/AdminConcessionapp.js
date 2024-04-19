import React, { useState, useEffect } from 'react';
import { fireapp ,firestore } from './firebase';
import './Sidebar.css';
import './AdminConcessionapp.css';
// import verified from './tick.png';
// import pending from './pending.png';
import { Link , useNavigate} from 'react-router-dom';

function AdminConcessionapp() {
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
      const snapshot = await firestore.collection('Applications').where('to_show', '==', 1).get(); // Query only where to_show is 0
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

  const handleAccept = async (applicationId) => {
    try {
      // Update Firestore document to set accept to 1 and to_show to 1
      await firestore.collection('Applications').doc(applicationId).update({
        accept: 1,
        reject: 0,
        to_show: 0,
        comment: 'No Comments'
      });
      alert('Application Accepted!');
      // Refetch applications
      fetchApplications();
    } catch (error) {
      console.error('Error accepting application: ', error);
    }
  };

  const handleReject = async (applicationId, comment) => {
    try {
      // Update Firestore document to set reject to 1 and to_show to 0
      await firestore.collection('Applications').doc(applicationId).update({
        accept: 0,
        reject: 1,
        to_show: 0,
        comment: comment || ''
      });
      alert('Application Rejected!');
      // Refetch applications
      fetchApplications();
    } catch (error) {
      console.error('Error rejecting application: ', error);
    }
  };

  const handleView = imageUrl => {
    // Open the provided image URL in a new tab
    window.open(imageUrl, '_blank');
  };

  const handleCommentChange = (applicationId, comment) => {
    // Update the comments state with the new comment
    setComments(prevState => ({
      ...prevState,
      [applicationId]: comment
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
      <Link to="/">
        <button type="submit" className="signout-button" onClick={handleSignOut}>
          Sign out
        </button>
      </Link>

      <div className="text-box-Admin">
        <h1>Pending Concessions</h1>
        <div className="container-apply">
          {applications.map(application => (
            <div
              key={application.id}
              className="textbox-apply"
              style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',  }}
            >
              <div>
                {/* <img src={pending} className="textbox-image" alt="verified" /> */}
              </div>
              <div>
                <p className="textbox-header">GR NO: {application.grNumber}</p>
                <p className="textbox-header">Name : {application.name}</p>
                <p className="textbox-header">Gender : {application.gender}</p>
              </div>
              <br />
              <div>
                <p className="textbox-header">Type : {application.Type}</p>
                <p className="textbox-header">Issued :{application.duration}</p>
                <p className="textbox-header">From : {application.destination}</p>
              </div>
              <br />
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
                  <button className="textbox-button-send" onClick={() => handleAccept(application.id)}>
                    Accept
                  </button>
                  <button className="textbox-button-send" onClick={() => handleReject(application.id, comments[application.id])}>
                    Reject
                  </button>
                  <label htmlFor="Comment"  className="textbox-header-comment">Comment: </label>
                <input
                  className="textbox-header-comment"
                  type="text"
                  id="Comment"
                  placeholder="Add comment..."
                  value={comments[application.id] || ''}
                  onChange={e => handleCommentChange(application.id, e.target.value)}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminConcessionapp;
