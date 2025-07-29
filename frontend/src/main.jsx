console.log("✅ main.jsx start");

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
console.log("✅ before render");

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
)
