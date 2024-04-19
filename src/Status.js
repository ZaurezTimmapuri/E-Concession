import React , { useState , useEffect }from 'react';
import './Status.css';
import './Sidebar.css'
import { Link, useNavigate } from 'react-router-dom';
import { fireapp , firestore } from './firebase'; // Assuming `fireapp` is your Firebase app instance

function Status() {
  const navigate = useNavigate();
  const [grNumber, setGrNumber] = useState('');
  const [comment, setComment] = useState('');
  const [accept, setAccept] = useState(0); // default value 0
  const [reject, setReject] = useState(0); // default value 0
  const [toShow, setToShow] = useState(0); // default value 0

  const uid = fireapp.auth().currentUser ? fireapp.auth().currentUser.uid : null;

  useEffect(() => {
    const checkVerification = async () => {
      const user = fireapp.auth().currentUser;
      if (user) {
        const uid = user.uid;
        const userDoc = await fireapp.firestore().collection('users').doc(uid).get();
        const isVerified = userDoc.data().is_verified;
        const userData = userDoc.data();
        setGrNumber(userData.grNumber); // Update grNumber state with grNumber field
        if (isVerified !== 1) {
          alert('You are not verified to access this page.');
          navigate('/UserDash'); // Redirect to home page or any other page
        }
      }
    };

    checkVerification();

    const fetchData = async () => {
      if (!uid) return; // Exit early if uid is null
      try {
        const docRef = await firestore.collection('Applications').doc(uid).get();
        if (docRef.exists) {
          const data = docRef.data();
          setAccept(data.accept || 0);
          setReject(data.reject || 0);
          setToShow(data.to_show || 0);
          setComment(data.comment || '');
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      }
    };
    fetchData();
    // Cleanup function to unsubscribe from the listener when component unmounts
    return () => {};



  }, [navigate] , [firestore, uid]);


  let verificationStatus;
  if (reject === 1) {
    verificationStatus = 'Rejected';
  } else if (accept === 1) {
    verificationStatus = 'Accepted';
  } else if (toShow === 1) {
    verificationStatus = 'Ongoing';
  } else {
    verificationStatus = 'Not specified';
  }

  const handleReapply = () => {
    alert('Your are re-applying Concession Application!')
    navigate('/Applicationform');
  };



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
      <Link to="/UpdateProfile" className="sidebar-button">
        Update Profile 
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
      {/* <button type="button" className="signout-button" onClick={handleSignOut}>
        Sign out
      </button> */}

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
              <td style={{ width: '375px', border: '3px solid black', height: '70px', textAlign: 'center' }}>{grNumber}</td>
              <td style={{ width: '375px', border: '3px solid black', height: '70px', textAlign: 'center', color: 'green' }}>{verificationStatus}</td>
              <td style={{ width: '375px', border: '3px solid black', height: '70px', textAlign: 'center' }}>
              {accept === 1 && (
                    <button onClick={handleViewpass} style={{ backgroundColor: 'green', color: 'white', margin: '10px', padding: '15px' }}>Redeem</button>
                  )}
                  {reject === 1 && (
                    <button onClick={handleReapply} style={{ backgroundColor: 'red', color: 'white', padding: '15px' }} >Reapply</button>
                  )}
                  {toShow === 1 && (
                    <p>Waiting.....</p>
                  )}
              </td>
            </tr>
          </tbody>
        </table>

        <p className="textbox-header-User-status">Admin Comments :  {comment} </p>
      </div>
    </div>
  );
}

export default Status;
