// src/pages/Dashboard.jsx
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar.jsx'
import { AuthContext } from '../contexts/AuthContext.jsx'

import Step1 from '../components/steps/Step1.jsx'
import Step2 from '../components/steps/Step2.jsx'
import Step3 from '../components/steps/Step3.jsx'
import Step4 from '../components/steps/Step4.jsx'
import Step5 from '../components/steps/Step5.jsx'
import Step6 from '../components/steps/Step6.jsx'
import Step7 from '../components/steps/Step7.jsx'

const STEP_TITLES = [
  'Company Information',
  'Point of Contact',
  'Technology Access Centres',
  'Innovation Challenge',
  'Project Timeline',
  'Company’s R&D/Innovation History',
  'Finalize Submission'
]

const Steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7]

// Tailwind classes for each status
const borderColor = {
  pending: 'border-l-gray-300',
  submitted: 'border-l-yellow-400',
  approved: 'border-l-green-400',
  rejected: 'border-l-red-400'
}
const bgColor = {
  pending: 'bg-gray-50',
  submitted: 'bg-yellow-50',
  approved: 'bg-green-50',
  rejected: 'bg-red-50'
}
const badgeColor = {
  pending: 'bg-gray-200 text-gray-700',
  submitted: 'bg-yellow-300 text-yellow-900',
  approved: 'bg-green-300 text-green-900',
  rejected: 'bg-red-300 text-red-900'
}

export default function Dashboard() {
  const { user, loading: authLoading } = useContext(AuthContext)
  const [stepsData, setStepsData] = useState([])
  const [editing, setEditing] = useState(null)
  const navigate = useNavigate()

  // load steps
  useEffect(() => {
    if (!user) return
    fetch('/api/clients/onboarding', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Could not load onboarding steps')
        return res.json()
      })
      .then(setStepsData)
      .catch((err) => {
        console.error(err)
        toast.error('Failed to load steps')
      })
  }, [user])

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">Loading…</div>
    )
  }

  return (
    <>
      <Navbar />

      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Onboarding Dashboard</h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {stepsData.map((step) => (
            <div
              key={step.number}
              onClick={() => setEditing(step.number)}
              className={`
                cursor-pointer
                ${borderColor[step.status]} ${bgColor[step.status]}
                rounded-2xl p-6 shadow hover:shadow-lg
                transform hover:-translate-y-1 transition
              `}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Step {step.number}
                  </h2>
                  <p className="mt-1 text-gray-700">
                    {STEP_TITLES[step.number - 1]}
                  </p>
                </div>
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    badgeColor[step.status]
                  }`}
                >
                  {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* EDIT PANEL */}
        {editing && (
          <div className="mt-10 bg-white p-8 rounded-2xl shadow-xl">
            <button
              onClick={() => setEditing(null)}
              className="text-blue-600 hover:underline mb-4"
            >
              ← Back to steps
            </button>

            <h2 className="text-2xl font-bold mb-4">
              Step {editing}: {STEP_TITLES[editing - 1]}
            </h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault()
                const formData = Object.fromEntries(
                  new FormData(e.target).entries()
                )
                const res = await fetch(`/api/clients/step/${editing}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
                  body: JSON.stringify({ data: formData })
                })
                if (!res.ok) {
                  const err = await res.json()
                  return toast.error(err.error)
                }
                toast.success('Saved!')
                setEditing(null)
                // reload
                const fresh = await fetch('/api/clients/onboarding', {
                  credentials: 'include'
                })
                setStepsData(await fresh.json())
              }}
              className="space-y-6"
            >
              {/* render the form fields */}
              {React.createElement(Steps[editing - 1], {
                data: stepsData.find((s) => s.number === editing)?.data || {}
              })}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  )
}
