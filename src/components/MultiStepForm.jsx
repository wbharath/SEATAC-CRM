// src/components/MultiStepForm.jsx
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { toast } from 'react-toastify'

import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import Step5 from './steps/Step5'
import Step6 from './steps/Step6'
import Step7 from './steps/Step7'

const Steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7]

export default function MultiStepForm() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [stepsData, setStepsData] = useState([])
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    if (user) fetchSteps()
  }, [user])

  async function fetchSteps() {
    const res = await fetch('/api/clients/onboarding', {
      credentials: 'include'
    })
    if (!res.ok) {
      console.error(await res.text())
      return
    }
    const data = await res.json()
    setStepsData(data)
    setCurrent(data.find((s) => s.status === 'pending')?.number || 1)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = Object.fromEntries(new FormData(e.target).entries())
    const res = await fetch(`/api/clients/step/${current}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ data: payload })
    })
    if (!res.ok) {
      const err = await res.json()
      return toast.error(err.error)
    }
    toast.success('Step submitted—awaiting approval')

    // if this was the very last step, go to dashboard
    if (current === Steps.length) {
      navigate('/dashboard', { replace: true })
    } else {
      fetchSteps()
    }
  }

  const stepInfo = stepsData.find((s) => s.number === current) || {}
  const status = stepInfo.status
  const data = stepInfo.data || {}
  const Active = Steps[current - 1] || (() => <p>Step not found</p>)

  return (
    <div className="max-w-4xl mx-auto my-8">
      {/* PROGRESS BAR */}
      <div className="h-2 bg-gray-200 rounded overflow-hidden mb-6">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{
            width: stepsData.length
              ? `${(current / stepsData.length) * 100}%`
              : '0%'
          }}
        />
      </div>

      {/* FORM CARD */}
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold">Step {current}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* render current step component */}
          <Active data={data} />

          {/* PREVIOUS / SUBMIT / NEXT */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setCurrent((c) => Math.max(1, c - 1))}
              disabled={current === 1}
              className={`px-4 py-2 rounded ${
                current === 1
                  ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>

            {status === 'pending' ? (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                {current === Steps.length ? 'Finish Onboarding' : 'Submit'}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrent((c) => Math.min(Steps.length, c + 1))}
                disabled={status !== 'approved'}
                className={`px-4 py-2 rounded ${
                  status === 'approved'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-700 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
