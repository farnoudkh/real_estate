import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'
import About from './components/About'
import {Routes, Route, useLocation} from 'react-router-dom'
import ContactUs from './components/ContactUs'


function App() {
  // const location = useLocation();
  // const { pathname } = location;
  // const visiblePaths = ['/', '/home', '/about', '/contactus'];
  // const isNavbarVisible = visiblePaths.includes(pathname);

  return (
    <>
      {/* {isNavbarVisible && <Navbar />} */}
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />                  
          <Route path="/register" element = {<Register/>}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/about" element = {<About/>}/>
          <Route path="/contactus" element = {<ContactUs />}/>
        </Routes>
    </>
  )
}

export default App
