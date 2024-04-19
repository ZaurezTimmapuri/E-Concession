import React, { useState , useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { fireapp } from './firebase';
import 'firebase/storage';
import './Applicationform.css';
import './Sidebar.css';

function Applicationform() {
  const [selectedDuration, setSelectedDuration] = useState('monthly');
  const [typeOfPass, setTypeOfPass] = useState('Firstclass');
  const [gender, setGender] = useState('male');
  const [Name, setName] = useState('');
  const [grNumber, setGrNumber] = useState('');
  const [photo, setPass] = useState(null);
  const [fee, setfee] = useState(null);
  const [id, setid] = useState(null);
  const [Destination , setDestination] = useState('');


  const navigate = useNavigate();


  useEffect(() => {
    const checkVerification = async () => {
      const user = fireapp.auth().currentUser;
      if (user) {
        const uid = user.uid;
        const userDoc = await fireapp.firestore().collection('users').doc(uid).get();
        const isVerified = userDoc.data().is_verified;
        const userData = userDoc.data();
        setName(userData.firstName); // Update Name state with firstname field
        setGrNumber(userData.grNumber); // Update grNumber state with grNumber field
        if (isVerified !== 1) {
          alert('You are not verified to access this page.');
          navigate('/UserDash'); // Redirect to home page or any other page
        }
      }
    };

    checkVerification();
  }, [navigate]);





  const handleGrNumberInput = (e) => {
    const inputValue = e.target.value.toUpperCase(); // Convert to uppercase
    setGrNumber(inputValue); // Update grNumber state
  };


  const handleDurationChange = (e) => {
    setSelectedDuration(e.target.value);
  };

  const handlePhotoChange = (e, setter) => {
    const file = e.target.files[0];
    setter(file);
  };

  const handleTypeOfPassChange = (e) => {
    setTypeOfPass(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    const user = fireapp.auth().currentUser;
        if (user) {
          const uid = user.uid;
          fireapp.firestore().collection('Applications').doc(uid).set({
            name:Name,
            grNumber:grNumber,
            duration:selectedDuration,
            Type: typeOfPass,
            gender:gender,
            destination : Destination,
            to_show:1,
            comment:'',
            reject:0,
            accept:0
          });};

     // Reference to Firebase Storage
    const storageRef = fireapp.storage().ref();
    const userFolderRef = storageRef.child(`Applications/${user.uid}`);
    
    // Upload previous pass image

    if (photo) {
      const previousPassImageRef = userFolderRef.child('previous_pass.jpg');
      await previousPassImageRef.put(photo);
      const previousPassImageUrl = await previousPassImageRef.getDownloadURL();
      await fireapp.firestore().collection('Applications').doc(user.uid).update({
        previousPassImageUrl: previousPassImageUrl
      });
    }
    
    // Upload fee receipt image
    
    if (fee) {
      const feeReceiptImageRef = userFolderRef.child('Fee_receipt.jpg');
      await feeReceiptImageRef.put(fee);
      // Get the download URL for fee receipt image
      const feeReceiptImageUrl = await feeReceiptImageRef.getDownloadURL();
      // Store the download URL in Firestore
      await fireapp.firestore().collection('Applications').doc(user.uid).update({
        feeReceiptImageUrl: feeReceiptImageUrl
      });
    }

    if (id) {
      const idImageRef = userFolderRef.child('id.jpg');
      await idImageRef.put(id);
      const idImageUrl = await idImageRef.getDownloadURL();
      await fireapp.firestore().collection('Applications').doc(user.uid).update({
        idImageUrl: idImageUrl
      });
    }

      setPass(null);
      setfee(null)
      setSelectedDuration('monthly'); // Reset to default value
      setTypeOfPass('Firstclass'); // Reset to default value
      setGender('male'); // Reset to default value
      setName(''); // Reset to default value
      setGrNumber(''); // Reset to default value

      navigate('/UserDash');

      alert('Application submitted!');

  };

  const stations = [
    "Airoli", "Ambarnath", "Ambivli", "Andheri", "Asangaon", "Atgaon", "Badlapur", 
    "Bandra", "Bhandup", "Bhayander", "Bhivpuri Road", "Boisar", "Borivali", "Byculla", 
    "CBD Belapur", "Charni Road", "Chembur", "Chinchpokli", "Churchgate", "Cotton Green", 
    "Currey Road", "Dadar", "Dahanu Road", "Dahisar", "Diva", "Dockyard Road", "Dolavli", 
    "Dom...", "Ghansoli", "Ghatkopar", "Goregaon", "Govandi", "Grant Road", "GTB Nagar", 
    "Jogeshwari", "Juinagar", "Kalwa", "Kalyan", "Kandivali", "Kanjurmarg", "Karjat", 
    "Kasara", "Kelavali", "Kelve Road", "Khadavli", "Khardi", "Khar Road", "Khopoli", 
    "King's Circle", "Kopar Khairane", "Lower Kopar", "Lower Parel", "Lowjee", 
    "Mahalaxmi", "Mahim", "Malad", "Mankhurd", "Marine Lines", "Masjid", "Matunga", 
    "Matunga Road", "Mira Road", "Mulund", "Mumbra", "Mumbai CST", "Mumbai Central", 
    "Naigaon", "Nahur", "Nala Sopara", "Neral", "Nerul", "Palasdari", "Palghar", 
    "Parel", "Panvel", "Prabhadevi", "Reay Road", "Rabale", "Ram Mandir", "Sandhurst Road", 
    "Sanpada", "Santa Cruz", "Saphale", "Sewri", "Shahad", "Shelu", "Sion", "Takurli", 
    "Thakurli", "Thane", "Tilak Nagar", "Titwala", "Turbhe", "Ulhasnagar", "Umroli", 
    "Vaitarna", "Vangaon", "Vasai Road", "Vashi", "Vasind", "Vidyavihar", "Vikhroli", 
    "Vile Parle", "Virar", "Vitthalwadi", "Wadala Road", "Wadala", "Wadala Road", 
    "Andheri", "Goregaon", "Kandivali", "Khar Road", "Malad", "Santacruz", "Vile Parle", 
    "Chunabhatti", "Dadar", "G.T.B. Nagar", "Govandi", "King's Circle", "Mankhurd", 
    "Panvel", "Seawoods - Darave", "Belapur CBD", "Khandeshwar", "Kharghar", 
    "Mansarovar", "Nerul", "Seawoods - Darave", "Turbhe", "Vashi"
  ];

  stations.sort();
  const stationOptions = stations.map((station, index) => (
    <option key={index} value={station}>{station}</option>
  ));


  const handleSignOut = async () => {
    try {
      await fireapp.auth().signOut(); // Sign out the user
      navigate('/'); // Navigate to the home page after signout
    } catch (error) {
      console.error('Sign out failed:', error.message);
    }
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
      {/* <Link to="/">
        <button type="submit" className="signout-button" onClick={handleSignOut}>
          Sign out
        </button>
      </Link> */}

      <div>
        <div className="text-box-application">
          <h1>Application form</h1>
          <form onSubmit={handleSubmit}>
            <div>
             <label htmlFor="Name">Name: </label>
                  <span className='text-User-application' >{Name}</span>
                  <br/>
             <label htmlFor="grNumber">GR number: </label>
                  <span className='text-User-application'>{grNumber}</span>
                  <br/>
              <label htmlFor="Name" className='text-Label-From-application'>From: </label>
              <select
                      id="Station"
                      className="alignment"
                      placeholder="Enter From Where you want to apply for Concession"
                      value={Destination}
                      required
                      onChange={(e) => setDestination(e.target.value)}>
                      <option value="">Select Station</option>
                      {stationOptions}
                    </select>
                    <br/>
              <label htmlFor="duration" className="radio">
                Duration of Pass:
              </label>
              <div className="radiodiv">
                <input
                  type="radio"
                  id="monthly"
                  name="duration"
                  value="monthly"
                  checked={selectedDuration === 'monthly'}
                  onChange={handleDurationChange}
                  required
                />
                <label htmlFor="monthly" className="radio">
                  Monthly
                </label>
              </div>
              <div className="radiodiv">
                <input
                  type="radio"
                  id="quarterly"
                  name="duration"
                  value="quarterly"
                  checked={selectedDuration === 'quarterly'}
                  onChange={handleDurationChange}
                  required
                />
                <label htmlFor="quarterly">Quarterly</label>
              </div>
            </div>
            <br/>
            <div>
              <label htmlFor="previouspassimage">Previous pass image:</label>
              <input
                type="file"
                id="previouspassimage"
                accept="image/*"
                required
                onChange={(e) => handlePhotoChange(e, setPass)}
              />
              <label htmlFor="previouspassimage">Fee Reciept image:</label>
              <input
                type="file"
                id="feeimage"
                accept="image/*"
                required
                onChange={(e) => handlePhotoChange(e, setfee)}
              />
               <label htmlFor="previouspassimage">ID card [BACK]:</label>
                <input
                type="file"
                id="idimage"
                accept="image/*"
                required
                onChange={(e) => handlePhotoChange(e, setid)}
              />
            </div>
            <br/>
            <div>
              <label htmlFor="typeofpass">Type of Pass:</label>
              <select id="typeofpass" className="alignment" onChange={handleTypeOfPassChange}>
                <option value="Firstclass">First-class</option>
                <option value="Secondclass">Second-class</option>
              </select>
            </div>
            <div>
              <label htmlFor="gender">Gender:</label>
              <select id="gender" className="alignment" onChange={handleGenderChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <br />
            <div className="button-container-application">
              <button  className="next-button-application" onClick={handleSubmit} >Apply</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Applicationform;
