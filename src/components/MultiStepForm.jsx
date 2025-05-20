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

const STEPS = [Step1, Step2, Step3, Step4, Step5, Step6, Step7]
const STEP_TITLES = [
  'Company Information',
  'Point of Contact',
  'Technology Access Centres',
  'Innovation Challenge',
  'Project Timeline',
  'Company’s R&D/Innovation History',
  'Finalize Submission'
]

export default function MultiStepForm() {
  const { user, loading: authLoading } = useContext(AuthContext)
  const navigate = useNavigate()

  // how many steps the admin has granted you
  const allowedStep = user?.allowedStep ?? 1

  const [stepsData, setStepsData] = useState([])
  const [current, setCurrent] = useState(1)
  const [busy, setBusy] = useState(false)

  // Fetch once on login/mount
  useEffect(() => {
    if (authLoading || !user) return

    fetch('/api/clients/onboarding', { credentials: 'include' })
      .then((r) => {
        if (!r.ok) throw new Error('Cannot load steps')
        return r.json()
      })
      .then((data) => {
        setStepsData(data)
        // start at the first pending step, but no further than allowedStep
        const firstPending =
          data.find((s) => s.status === 'pending')?.number || 1
        setCurrent(Math.min(firstPending, allowedStep))
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to load steps')
      })
  }, [authLoading, user, allowedStep])

  // Grab current step info
  const stepInfo = stepsData.find((s) => s.number === current) || {
    number: current,
    status: 'pending',
    data: {}
  }
  const { status, data } = stepInfo
  const isPending = status === 'pending'
  const Active = STEPS[current - 1]

  // Save helper
  async function saveStep(formData) {
    setBusy(true)
    try {
      const res = await fetch(`/api/clients/step/${current}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ data: formData })
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Save failed')
      }
      toast.success('Step saved—awaiting approval')
      // update local so Next unlocks
      setStepsData((all) =>
        all.map((s) =>
          s.number === current
            ? { ...s, status: 'submitted', data: formData }
            : s
        )
      )
      return true
    } catch (err) {
      console.error(err)
      toast.error(err.message)
      return false
    } finally {
      setBusy(false)
    }
  }

  // “Next” handler: save if needed then advance
  async function goNext(e) {
    e?.preventDefault()
    if (isPending) {
      // serialize and save
      const formEl = document.querySelector('form')
      const payload = Object.fromEntries(new FormData(formEl).entries())
      const ok = await saveStep(payload)
      if (!ok) return
    }
    // advance only if below allowedStep
    if (current < allowedStep) {
      setCurrent((c) => c + 1)
    } else {
      toast.info(`You only have access through step ${allowedStep}`)
    }
  }

  // “Submit” handler on the final allowed step
  async function handleSubmit(e) {
    e.preventDefault()
    if (!isPending) return
    const formEl = e.target
    const payload = Object.fromEntries(new FormData(formEl).entries())
    const ok = await saveStep(payload)
    if (ok && current === allowedStep) {
      navigate('/dashboard', { replace: true })
    }
  }

  // Loading
  if (authLoading || !stepsData.length) {
    return <div className="text-center py-16">Loading…</div>
  }

  return (
    <div className="max-w-3xl mx-auto my-8">
      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 rounded overflow-hidden mb-6">
        <div
          className="h-full bg-blue-500"
          style={{ width: `${(allowedStep / STEPS.length) * 100}%` }}
        />
      </div>

      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold">
          Step {current}: {STEP_TITLES[current - 1]}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Active data={data} />

          <div className="flex justify-between items-center">
            {/* Previous */}
            <button
              type="button"
              onClick={() => current > 1 && setCurrent((c) => c - 1)}
              disabled={current === 1}
              className={`px-4 py-2 rounded text-white ${
                current === 1
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              Previous
            </button>

            {/* Next vs Submit */}
            {current < allowedStep ? (
              <button
                type="button"
                onClick={goNext}
                disabled={busy}
                className={`px-4 py-2 rounded text-white ${
                  busy
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {busy ? 'Saving…' : 'Next'}
              </button>
            ) : (
              <button
                type="submit"
                disabled={busy}
                className={`px-4 py-2 rounded text-white ${
                  busy
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {busy ? 'Saving…' : 'Submit'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
