// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './components/Signin.jsx'
import HomeClient from './pages/HomeClient.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App() {
  return (
    <Routes>
      {/* public */}
      <Route path="/login" element={<SignIn />} />

      {/* client onboarding */}
      <Route
        path="/homeclient"
        element={
          <ProtectedRoute>
            <HomeClient />
          </ProtectedRoute>
        }
      />

      {/* post-onboarding dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* catch-all → login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
