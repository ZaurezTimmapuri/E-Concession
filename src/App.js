import React from 'react'
import Navbar from './navbar'
import Home from './Home'
import Signup from './Signup'
import Aboutus from './Aboutus'
import Contactus from './Contactus'
import Login from './Login'
import UserVerify from './UserVerify'
import Profileinformation from './Profileinformation'
import Applicationform from './Applicationform'
import Status from './Status'
import AdminProfiles from './AdminProfiles'
import AdminConcessionapp from './AdminConcessionapp'
import AdminConcessionreview from './AdminConcessionreview'
import AdminDash from './AdminDash'
import UserDash from './UserDash'

import {
  BrowserRouter as Router ,Route, Routes
} from "react-router-dom";
export default function App() {
  return (
    <div>
      <Router>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}></Route>  
      <Route path='/Signup' element={<Signup/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/About us' element={<Aboutus/>}></Route>
      <Route path='/Contact us' element={<Contactus/>}></Route>
      <Route path='/Profileinformation' element={<Profileinformation/>}></Route>
      <Route path='/Applicationform' element={<Applicationform/>}></Route>
      <Route path='/Status' element={<Status/>}></Route>
      <Route path='/UserDash' element={<UserDash/>}></Route>
      <Route path='/AdminDash' element={<AdminDash/>}></Route>
      <Route path='/UserVerify' element={<UserVerify/>}></Route>
      <Route path='/AdminProfiles' element={<AdminProfiles/>}></Route>
      <Route path='/AdminConcessionapp' element={<AdminConcessionapp/>}></Route>
      <Route path='/AdminConcessionreview' element={<AdminConcessionreview/>}></Route>
      </Routes>
      </Router>
    </div>
  )
}
