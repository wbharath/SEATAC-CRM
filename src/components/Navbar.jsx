// src/components/Navbar.jsx
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import seatacLogo from '../assets/seatac.webp'

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await fetch('/logout', {
      method: 'GET',
      credentials: 'include'
    })
    setUser(null)
    navigate('/login')
  }

  return (
    <nav className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
      {/* Logo + Title */}
      <Link to="/homeclient" className="flex items-center space-x-2">
        <div className="h-10 w-10 bg-blue-800 rounded-full flex items-center justify-center">
          <img
            src={seatacLogo}
            alt="SEATAC CRM"
            className="h-6 w-6 object-contain"
          />
        </div>
        <span className="text-xl font-semibold text-gray-800">SEATAC CRM</span>
      </Link>

      {/* User Info + Logout */}
      <div className="flex items-center space-x-4">
        {user && (
          <>
            <div className="flex items-center space-x-2">
              {user.photo && (
                <img
                  src={user.photo}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              )}
              <span className="text-gray-700 font-medium">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
