import './App.css'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'
import About from './components/About'
import {Routes, Route} from 'react-router-dom'
import ContactUs from './components/ContactUs'
import PropertyDetail from './components/PropertyDetail'
import Properties from './components/Properties'
import { AuthProvider } from "./components/AuthContext";
import ScrollToTop from "./components/ScrollToTop";

function App() {
 
  return (
    <AuthProvider>
      <>
          <Navbar/>
          <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />                  
              <Route path="/register" element = {<Register/>}/>
              <Route path="/login" element = {<Login/>}/>
              <Route path="/about" element = {<About/>}/>
              <Route path="/contactus" element = {<ContactUs />}/>
              <Route path="/listings/:slug" element={<PropertyDetail />} />
              <Route path="/properties/" element={<Properties />} />
            </Routes>
      </>
    </AuthProvider>
  )
}

export default App
