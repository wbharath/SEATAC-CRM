import React, { useEffect, useState, useContext } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar.jsx'
import MultiStepForm from '../components/MultiStepForm.jsx'
import { AuthContext } from '../contexts/AuthContext.jsx'

export default function HomeClient() {
  // 1. Hooks at top—always in the same order
  const { user, loading: authLoading } = useContext(AuthContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const [onboarding, setOnboarding] = useState(null)
  const navigate = useNavigate()

  // 2. Show toast on “login=success” query once
  useEffect(() => {
    if (searchParams.get('login') === 'success') {
      toast.success('Logged in successfully!')
      setSearchParams({})
    }
  }, [searchParams, setSearchParams])

  // 3. Fetch onboarding steps as soon as we know the user
  useEffect(() => {
    if (authLoading || !user) return

    fetch('/api/clients/onboarding', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load onboarding steps')
        return res.json()
      })
      .then(setOnboarding)
      .catch((err) => {
        console.error(err)
        toast.error('Error loading onboarding steps')
      })
  }, [authLoading, user])

  // 4. Determine if every step is done (no longer “pending”)
  const allDone = Array.isArray(onboarding)
    ? onboarding.every((step) => step.status !== 'pending')
    : false

  // 5. Redirect to dashboard when done
  useEffect(() => {
    if (allDone) {
      navigate('/dashboard', { replace: true })
    }
  }, [allDone, navigate])

  // 6. Loading state while auth or fetch is in progress
  if (authLoading || onboarding === null) {
    return (
      <div className="flex items-center justify-center h-screen">Loading…</div>
    )
  }

  // 7. If onboarding is fully complete, we’ve kicked off redirect; render nothing
  if (allDone) {
    return null
  }

  // 8. Otherwise render the navbar + multi-step form
  return (
    <>
      <Navbar />
      <div className="p-8 max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Welcome, let’s get started!</h1>
        <MultiStepForm />
      </div>
    </>
  )
}
