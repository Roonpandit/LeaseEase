import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './box/AuthContext';
import './App.css'

import Auth from './box/Auth'
import About from "./box/About"
import Contact from "./box/Contact"

import Status from "./tenant/Status"
import Form from "./tenant/Form"
import Payment from "./tenant/Payment"

import Data from "./landlord/Data"
import Payments from './landlord/Payments';
import Bill from './landlord/Bill'

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
      <Route path="/Bill" element={<ProtectedRoute><Bill /></ProtectedRoute>} />
      <Route path='/Data' element= {<ProtectedRoute><Data/></ProtectedRoute>} />
      <Route path='/Payments' element= {<ProtectedRoute><Payments/></ProtectedRoute>} />
    </Routes>
    </>
  )
}
export default App