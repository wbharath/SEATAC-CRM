// src/pages/HomeClient.jsx
import React, { useEffect, useState, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import MultiStepForm from '../components/MultiStepForm'
import Dashboard from './Dashboard' // ← your client‐side dashboard
import { AuthContext } from '../contexts/AuthContext'

export default function HomeClient() {
  const { user, loading: authLoading } = useContext(AuthContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const [stepsData, setStepsData] = useState(null)

  // 1) Show toast when you arrive with ?login=success
  useEffect(() => {
    if (searchParams.get('login') === 'success') {
      toast.success('Logged in successfully!')
      setSearchParams({})
    }
  }, [searchParams, setSearchParams])

  // 2) Fetch onboarding steps as soon as we know the user
  useEffect(() => {
    if (authLoading || !user) return
    fetch('/api/clients/onboarding', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Could not load onboarding steps')
        return res.json()
      })
      .then(setStepsData)
      .catch((err) => {
        console.error(err)
        toast.error('Failed to load onboarding steps')
      })
  }, [authLoading, user])

  // 3) Loading state
  if (authLoading || stepsData === null) {
    return (
      <div className="flex items-center justify-center h-screen">Loading…</div>
    )
  }

  // 4) If **any** step is no longer pending → show dashboard
  const anyFilled = stepsData.some((s) => s.status !== 'pending')

  return (
    <>
      {anyFilled ? (
        // show your cards & per‐step dashboard
        <Dashboard />
      ) : (
        // first‐time user: drop them straight into the form
        <div className="p-8 max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold mb-4">
            Welcome, let’s get started!
          </h1>
          <MultiStepForm />
        </div>
      )}
    </>
  )
}
