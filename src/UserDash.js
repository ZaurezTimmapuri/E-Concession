import React, { useState, useEffect } from 'react';
import { Link  ,  useNavigate} from 'react-router-dom';
import './UserDash.css';
import './Sidebar.css';
import { fireapp, firestore } from './firebase';

function UserDash() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [admissionDate, setAdmissionDate] = useState(null);
  const [branchName, setBranchName] = useState('');
  const [year, setYear] = useState('');
  const [grNumber, setGrNumber] = useState('');
  const [division, setDivision] = useState('');
  const [comment, setComment] = useState('');
  const [accept, setAccept] = useState(0); // default value 0
  const [reject, setReject] = useState(0); // default value 0
  const [toShow, setToShow] = useState(0); // default value 0
  const navigate = useNavigate();
  const uid = fireapp.auth().currentUser ? fireapp.auth().currentUser.uid : null;

  useEffect(() => {
    const fetchData = async () => {
      if (!uid) return; // Exit early if uid is null
      try {
        const docRef = await firestore.collection('users').doc(uid).get();
        if (docRef.exists) {
          const data = docRef.data();
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setMobileNumber(data.mobileNumber);
          setAddress(data.address);
          setBranchName(data.branchName);
          setYear(data.year);
          setGrNumber(data.grNumber);
          setDivision(data.division);
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
  }, [firestore, uid]);

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
    alert('Your are re-applying your Profile!')
    navigate('/UpdateProfile');
  };


  const handleSignOut = async () => {
    try {
      await fireapp.auth().signOut(); // Sign out the user
      navigate('/'); // Navigate to the home page after signout
    } catch (error) {
      console.error('Sign out failed:', error.message);
    }
  };


  return (
        <div>
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
                {/* <Link to="/"> 
                <button type="submit"  className="signout-button" >Sign out</button>
                </Link> */}
                <button onClick={handleSignOut} className="signout-button">
                Sign Out
                </button>
                <div className='text-box-User'>
                {/* <div>
                        <h1>Welcome</h1>
                        {data && (
                    <div>
                        {Object.entries(data).map(([key, value]) => (
                        <p key={key}>
                        <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
                        </p>))}
                    </div>)}
                </div> */}




<div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Details</th>
            <th>Obtained</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>First Name</td>
            <td><strong></strong> {firstName}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td><strong></strong> {lastName}</td>
          </tr>
          <tr>
            <td>Branch Name</td>
            <td><strong></strong> {branchName}</td>
          </tr>
          <tr>
            <td>Year</td>
            <td><strong></strong> {year}</td>
          </tr>
          <tr>
            <td>Division</td>
            <td><strong></strong> {division}</td>
          </tr>
          <tr>
            <td>Gr Number</td>
            <td><strong></strong> {grNumber}</td>
          </tr>
          <tr>
            <td>Mobile Number</td>
            <td><strong></strong> {mobileNumber}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td><strong></strong> {address}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
    <p className="textbox-header-User">Verification Status : {verificationStatus}</p>
    </div>
    <div>
    <p className="textbox-header-User">Admin Comments :  {comment} </p>
    </div>
    {reject === 1 && (
          <div className='button-container-UserDash'>
            <button onClick={handleReapply} className="reapply-button">Reapply</button>
          </div>
        )}
                </div>

            </div>
        </div>
  )
}

export default UserDash ;