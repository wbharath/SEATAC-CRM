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

const stepTitles = [
  'Company Information',
  'Point of Contact',
  'Technology Access Centres',
  'Innovation Challenge',
  'Project Timeline',
  'Company’s R&D/Innovation History',
  'Finalize Submission'
]

const Steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7]

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const [stepsData, setStepsData] = useState([])
  const [editing, setEditing] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return
    fetch('/api/clients/onboarding', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Could not load onboarding steps')
        return res.json()
      })
      .then((data) => setStepsData(data))
      .catch((err) => toast.error(err.message))
  }, [user])

  const handleCardClick = (step) => {
    // if (step.status !== 'approved') {
    //   return toast.info('Step must be approved before editing')
    // }
    setEditing(step.number)
  }

  const saveStep = async (stepNum, data) => {
    const res = await fetch(`/api/clients/step/${stepNum}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ data })
    })
    if (!res.ok) {
      const err = await res.json()
      return toast.error(err.error)
    }
    toast.success('Saved!')
    setEditing(null)
    // refresh data
    const updated = await fetch('/api/clients/onboarding', {
      credentials: 'include'
    })
    setStepsData(await updated.json())
  }

  if (!stepsData.length) {
    return <p className="p-8 text-center">Loading…</p>
  }

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Onboarding Dashboard</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {stepsData.map((step) => {
            let colorClasses = 'bg-gray-50 border-gray-200'
            if (step.status === 'submitted')
              colorClasses = 'bg-yellow-50 border-yellow-300'
            if (step.status === 'approved')
              colorClasses = 'bg-green-50 border-green-300'

            return (
              <div
                key={step.number}
                onClick={() => handleCardClick(step)}
                className={`cursor-pointer p-4 border rounded-lg shadow-sm hover:shadow-md transition ${colorClasses}`}
              >
                <h2 className="text-xl font-semibold mb-1">
                  Step {step.number}
                </h2>
                <p className="text-gray-700 font-medium">
                  {stepTitles[step.number - 1]}
                </p>
                <p className="text-sm text-gray-500">
                  Status:{' '}
                  <span className="font-semibold">
                    {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                  </span>
                </p>
              </div>
            )
          })}
        </div>

        {editing && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Edit: {stepTitles[editing - 1]}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = Object.fromEntries(
                  new FormData(e.target).entries()
                )
                saveStep(editing, formData)
              }}
              className="space-y-6"
            >
              {React.createElement(Steps[editing - 1], {
                data: stepsData.find((s) => s.number === editing)?.data || {}
              })}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
