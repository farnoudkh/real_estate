console.log("✅ main.jsx start");

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
console.log("✅ before render");
console.log('MODE =', import.meta.env.MODE);
console.log('VITE_API_BASE_URL =', import.meta.env.VITE_API_BASE_URL);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router basename='/realestate'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
)
