import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import './App.css'; //Optional
import AddTaskPage from './components/AddTaskPage';
import EditTaskPage from './components/EditTaskPage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/add-task" element={<AddTaskPage />} />
          <Route path="/edit-task/:id" element={<EditTaskPage />} />
        </Routes>
    </Router>
  );
}

export default App;