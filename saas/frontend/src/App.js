import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import Checkout from './pages/Checkout';
import Login from './pages/Login'; 
import Register from './pages/Register'; 


import UserTable from './components/UserTable';
import PlanDetails from './components/PlanDetails';
import PlanList from './components/PlanList';
import Cart from './components/Cart';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
         <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
       

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/user-table" element={<ProtectedRoute><UserTable /></ProtectedRoute>} />
        <Route path="/plan-details" element={<ProtectedRoute><PlanDetails /></ProtectedRoute>} />
        <Route path="/plan-list" element={<ProtectedRoute><PlanList /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

        {/* 404 Fallback */}
        <Route path="*" element={<h1 style={{ textAlign: 'center', marginTop: '2rem' }}>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
