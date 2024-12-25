import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './box/AuthContext';
import './App.css'
import Auth from './box/Auth'
import About from "./box/About"
import Contact from "./box/Contact"
import Status from './tenant/Status';
import Form from "./tenant/Form"
import Payment from "./tenant/Payment"
import Abouts from "./tenant/Abouts"
import Contacts from "./tenant/Contacts"
import Status_1 from "./landlord/Status_1"
import Data from "./landlord/Data"
import Payment_1 from './landlord/Payment_1';
import About_1 from "./landlord/About_1"
import Contact_1 from "./landlord/Contact_1"

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth(); 
  return isAuthenticated ? children : <Navigate to="/" />;  
}

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Auth/>} />
      <Route path='/About' element= {<About/>} />
      <Route path='/Contact' element= {<Contact/>} />
      <Route path='/Status' element= {<ProtectedRoute><Status/></ProtectedRoute>} />
      <Route path="/Form" element={<ProtectedRoute><Form /></ProtectedRoute>} />
      <Route path='/Payment' element= {<ProtectedRoute><Payment/></ProtectedRoute>} />
      <Route path='/Abouts' element= {<Abouts/>} />
      <Route path='/Contacts' element= {<Contacts/>} />
      <Route path="/Status_1" element={<ProtectedRoute><Status_1 /></ProtectedRoute>} />
      <Route path='/Data' element= {<ProtectedRoute><Data/></ProtectedRoute>} />
      <Route path='/Payment_1' element= {<ProtectedRoute><Payment_1/></ProtectedRoute>} />
      <Route path='/About_1' element= {<About_1/>} />
      <Route path='/Contact_1' element= {<Contact_1/>} />
    </Routes>
    </>
  )
}
export default App