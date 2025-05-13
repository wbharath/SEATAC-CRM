// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    // still checking cookie/session
    return (
      <div className="flex items-center justify-center h-screen">Loading…</div>
    )
  }

  if (!user) {
    // not logged in → back to sign-in
    return <Navigate to="/" replace />
  }

  return children
}
