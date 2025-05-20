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

  // 1️⃣ Load all clients (including their allowedStep)
  useEffect(() => {
    fetch('/api/admin/clients', { credentials: 'include' })
      .then((r) => {
        if (!r.ok) throw new Error('Could not load clients')
        return r.json()
      })
      .then(setClients)
      .catch((e) => toast.error(e.message))
  }, [])

  // 2️⃣ Pick a client → load their steps
  function pickClient(id) {
    const client = clients.find((c) => c._id === id)
    setSelected(client)
    setSteps([])

    fetch(`/api/admin/clients/${id}/steps`, { credentials: 'include' })
      .then((r) => {
        if (!r.ok) throw new Error('Could not load steps')
        return r.json()
      })
      .then(setSteps)
      .catch((e) => toast.error(e.message))
  }

  // 3️⃣ Increase their allowedStep
  function updateAllowed(e) {
    const newAllowed = parseInt(e.target.value, 10)
    fetch(`/api/admin/clients/${selectedClient._id}/allow/${newAllowed}`, {
      method: 'POST',
      credentials: 'include'
    })
      .then((r) => {
        if (!r.ok) throw new Error('Could not update allowed step')
        return r.json()
      })
      .then(({ allowedStep }) => {
        setSelected((c) => ({ ...c, allowedStep }))
        toast.success(`Client may now fill up to step ${allowedStep}`)
      })
      .catch(() => toast.error('Could not update allowed step'))
  }

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto space-y-6">
        {/* A) Client list */}
        {!selectedClient && (
          <>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {clients.map((c) => {
                const allowed = c.allowedStep ?? 1
                return (
                  <div
                    key={c._id}
                    onClick={() => pickClient(c._id)}
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
                        <p className="mt-1 text-xs text-gray-600">
                          Allowed Step:{' '}
                          <span className="font-bold">{allowed}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* B) Detail view + increase‐step picker */}
        {selectedClient && (
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

            {/* show current allowed and only allow bumping past it */}
            <div className="mb-6">
              <span className="font-medium">Current allowed step:</span>{' '}
              <span className="font-semibold">
                {selectedClient.allowedStep ?? 1}
              </span>
              <label className="ml-6">
                Increase to:
                <select
                  className="ml-2 border rounded px-2 py-1"
                  defaultValue=""
                  onChange={updateAllowed}
                >
                  <option value="" disabled>
                    Select…
                  </option>
                  {Array.from(
                    { length: 7 - (selectedClient.allowedStep ?? 1) },
                    (_, i) => (selectedClient.allowedStep ?? 1) + i + 1
                  ).map((n) => (
                    <option key={n} value={n}>
                      Step {n}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((s) => (
                <div
                  key={s.number}
                  className={`
                    border-l-4
                    ${statusStyles[s.status] || 'border-gray-300 bg-white'}
                    rounded-2xl p-6 shadow-md
                  `}
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    Step {s.number}
                  </h3>
                  <p className="mt-1 text-gray-700">
                    {STEP_TITLES[s.number - 1]}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Status: {s.status}
                  </p>
                  {s.status === 'submitted' && (
                    <details className="mt-2 text-xs text-gray-500">
                      <summary className="cursor-pointer">View data</summary>
                      <pre className="bg-gray-100 p-2 rounded mt-1 overflow-auto text-xs">
                        {JSON.stringify(s.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}
