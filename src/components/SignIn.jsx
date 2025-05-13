// src/components/SignIn.jsx
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import seatacLogo from '../assets/seatac.webp'

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full bg-gray-50 rounded-2xl shadow-lg p-8 space-y-6">
        {/* Logo with colored circle */}
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center">
            <img
              src={seatacLogo}
              alt="SEATAC CRM"
              className="h-8 w-8 object-contain"
            />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-gray-800">
            Welcome to SEATAC CRM
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to manage your onboarding steps
          </p>
        </div>

        {/* Google Sign-In */}
        <div>
          <a
            href="/auth/google"
            className="w-full flex items-center justify-center py-3 px-5 bg-white border border-gray-300 rounded-md hover:shadow transition"
          >
            <FcGoogle className="w-6 h-6 mr-3" />
            <span className="text-gray-700 font-medium">
              Sign in with Google
            </span>
          </a>
        </div>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Email Sign-In */}
        <div>
          <button
            onClick={() => alert('Email/password flow coming soon')}
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Sign in with Email
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <a href="#" className="font-medium text-indigo-600 hover:underline">
            Contact Admin
          </a>
        </p>
      </div>
    </div>
  )
}
