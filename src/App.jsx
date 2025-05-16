// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import SignIn from './components/SignIn'
import HomeClient from './pages/HomeClient'
import AdminDashboard from './pages/AdminDashboard'
import Dashboard from './pages/Dashboard'
export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<SignIn />} />

      {/* Client */}
      <Route
        path="/homeclient"
        element={
          <ProtectedRoute requireRole="client">
            <HomeClient />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admindashboard"
        element={
          <ProtectedRoute requireRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requireRole="client">
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
