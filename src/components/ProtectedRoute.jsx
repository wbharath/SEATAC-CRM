// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function ProtectedRoute({ children, requireRole }) {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">Loading…</div>
    )
  }
  if (!user) {
    return <Navigate to="/login" replace />
  }
  if (requireRole && user.role !== requireRole) {
    return <Navigate to="/login" replace />
  }
  return children
}
