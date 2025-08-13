import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Login from './pages/adminAuth/Login'
import { BrowserRouter, Routes, Route } from "react-router";
import VerifySecret from './pages/userAuth/VerifySecret';
import LoginPage from './pages/adminAuth/Login';
import UserDashboard from './pages/Dashboard';
import Signup from './pages/adminAuth/Signup';
import AdminDashboard from './pages/AdminDashboard';
import LandingPage from './pages/LandingPage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/userlogin" element={<VerifySecret />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
