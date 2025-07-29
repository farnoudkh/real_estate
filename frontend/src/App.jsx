console.log("✅ App component loaded");
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import BrowserRouter and Navigate
import ContactUs from './components/ContactUs';
import PropertyDetail from './components/PropertyDetail';
import Properties from './components/Properties';
import { AuthProvider } from "./components/AuthContext";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  console.log("✅ App rendering");
  return (
    <Router basename="/realestate">
      <AuthProvider>
        <>
          <Navbar/>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/listings/:slug" element={<PropertyDetail />} />
            <Route path="/properties/" element={<Properties />} />
          </Routes>
        </>
      </AuthProvider>
    </Router>
  );
}

export default App;