// src/components/steps/Step5.jsx
import React, { useState, useEffect } from 'react'

const START_OPTIONS = [
  'As soon as possible',
  'Before a specific date',
  'After a specific date',
  'Flexible'
]

const END_OPTIONS = [
  'As soon as possible',
  'Results are required before a specific date',
  'Flexible'
]

export default function Step5({ data = {} }) {
  const [startOption, setStartOption] = useState(data.startOption || '')
  const [startDate, setStartDate] = useState(data.startDate || '')
  const [endOption, setEndOption] = useState(data.endOption || '')
  const [endDate, setEndDate] = useState(data.endDate || '')

  useEffect(() => {
    if (data.startOption) setStartOption(data.startOption)
    if (data.startDate) setStartDate(data.startDate)
    if (data.endOption) setEndOption(data.endOption)
    if (data.endDate) setEndDate(data.endDate)
  }, [data])

  return (
    <div className="space-y-6">
      <hr className="border-gray-300" />

      {/* Desired Start */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Desired Project Start Date*
        </h3>
        <select
          name="startOption"
          value={startOption}
          onChange={(e) => setStartOption(e.target.value)}
          required
          className="block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            --Select--
          </option>
          {START_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {(startOption === 'Before a specific date' ||
          startOption === 'After a specific date') && (
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="mt-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      </div>

      {/* Desired End */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Desired Project End Date*
        </h3>
        <select
          name="endOption"
          value={endOption}
          onChange={(e) => setEndOption(e.target.value)}
          required
          className="block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            --Select--
          </option>
          {END_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {endOption === 'Results are required before a specific date' && (
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="mt-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      </div>
    </div>
  )
}
