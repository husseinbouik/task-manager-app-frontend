import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/layout/Navbar';
import './App.css'; //Optional

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">  {/* Bootstrap container */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} /> {/* Default route: dashboard */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;