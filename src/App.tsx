import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './hooks/useToast';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorProfile from './pages/DoctorProfile';
import MyAppointments from './pages/MyAppointments';
import Profile from './pages/Profile';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/doctors/:id" element={
              <ProtectedRoute>
                <Layout>
                  <DoctorProfile />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/appointments" element={
              <ProtectedRoute>
                <Layout>
                  <MyAppointments />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;