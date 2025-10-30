import React, { useEffect, useState, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import MultiStepForm from '../components/MultiStepForm'
import Dashboard from './Dashboard'
import { AuthContext } from '../contexts/AuthContext'
import API_URL from '../utils/api'

export default function HomeClient() {
  const { user, loading: authLoading } = useContext(AuthContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const [stepsData, setStepsData] = useState(null)

  useEffect(() => {
    if (searchParams.get('login') === 'success') {
      toast.success('Logged in successfully!')
      setSearchParams({})
    }
  }, [searchParams, setSearchParams])

  useEffect(() => {
    if (authLoading || !user) return
    fetch(`${API_URL}/api/clients/onboarding`, { credentials: 'include' })
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

  if (authLoading || stepsData === null) {
    return (
      <div className="flex items-center justify-center h-screen">Loading…</div>
    )
  }

  const anyFilled = stepsData.some((s) => s.status !== 'pending')

  return (
    <>
      {anyFilled ? (
        <Dashboard />
      ) : (
        <div className="p-8 max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold mb-4">
            Welcome, let's get started!
          </h1>
          <MultiStepForm />
        </div>
      )}
    </>
  )
}
