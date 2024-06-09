import './App.css'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'
import About from './components/About'
import {Routes, Route, useLocation} from 'react-router-dom'
import ContactUs from './components/ContactUs'
import PropertyDetail from './components/PropertyDetail'
import { AuthProvider } from "./components/AuthContext";


function App() {
 
  return (
    <AuthProvider>
      <>
          <Navbar/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />                  
              <Route path="/register" element = {<Register/>}/>
              <Route path="/login" element = {<Login/>}/>
              <Route path="/about" element = {<About/>}/>
              <Route path="/contactus" element = {<ContactUs />}/>
              <Route path="/listings/:slug" element={<PropertyDetail />} />
            </Routes>
      </>
    </AuthProvider>
  )
}

export default App
