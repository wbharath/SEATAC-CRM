// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'

const STEP_TITLES = [
  'Company Information',
  'Point of Contact',
  'Technology Access Centres',
  'Innovation Challenge',
  'Project Timeline',
  'Company’s R&D/Innovation History',
  'Finalize Submission'
]

// map each status to a Tailwind accent class
const statusStyles = {
  pending: 'border-gray-300 bg-gray-50',
  submitted: 'border-yellow-400 bg-yellow-50',
  approved: 'border-green-400 bg-green-50',
  rejected: 'border-red-400 bg-red-50'
}

export default function AdminDashboard() {
  const [clients, setClients] = useState([])
  const [selectedClient, setSelected] = useState(null)
  const [steps, setSteps] = useState([])
  const [selectedStep, setStep] = useState(null)

  // load clients
  useEffect(() => {
    fetch('/api/admin/clients', { credentials: 'include' })
      .then((r) => {
        if (!r.ok) throw new Error('Could not load clients')
        return r.json()
      })
      .then(setClients)
      .catch((e) => toast.error(e.message))
  }, [])

  // when a client is picked, load their steps
  function pickClient(id, name) {
    setSelected({ id, name })
    setStep(null)
    fetch(`/api/admin/clients/${id}/steps`, { credentials: 'include' })
      .then((r) => {
        if (!r.ok) throw new Error('Could not load steps')
        return r.json()
      })
      .then(setSteps)
      .catch((e) => toast.error(e.message))
  }

  return (
    <>
      <Navbar />

      <div className="p-8 max-w-6xl mx-auto space-y-6">
        {/* 1️⃣ Client list */}
        {!selectedClient && (
          <>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {clients.map((c) => (
                <div
                  key={c._id}
                  onClick={() => pickClient(c._id, c.name)}
                  className="cursor-pointer bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition"
                >
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-lg font-semibold">
                      {c.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {c.name}
                      </h2>
                      <p className="text-sm text-gray-500">{c.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 2️⃣ Step cards for chosen client */}
        {selectedClient && !selectedStep && (
          <>
            <button
              onClick={() => setSelected(null)}
              className="text-blue-600 hover:underline mb-4"
            >
              ← Back to clients
            </button>
            <h1 className="text-2xl font-bold mb-4">
              {selectedClient.name}’s Onboarding
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((s) => (
                <div
                  key={s.number}
                  onClick={() => setStep(s)}
                  className={`
                    cursor-pointer
                    border-l-4
                    ${statusStyles[s.status] || 'border-gray-300 bg-white'}
                    rounded-2xl
                    p-6
                    shadow-md
                    hover:shadow-xl
                    transform
                    hover:-translate-y-1
                    transition
                  `}
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    Step {s.number}
                  </h3>
                  <p className="mt-1 text-gray-700">
                    {STEP_TITLES[s.number - 1]}
                  </p>
                  <span className="inline-block mt-2 text-xs font-medium uppercase tracking-wide text-gray-600">
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 3️⃣ Raw JSON view of selected step */}
        {selectedStep && (
          <div>
            <button
              onClick={() => setStep(null)}
              className="text-blue-600 hover:underline mb-4"
            >
              ← Back to steps
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              Step {selectedStep.number}: {STEP_TITLES[selectedStep.number - 1]}
            </h2>
            <pre className="bg-gray-100 rounded-lg p-6 overflow-auto text-sm">
              {JSON.stringify(selectedStep.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </>
  )
}
