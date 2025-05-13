import React, { useState, useEffect } from 'react'

export default function Step6({ data }) {
  // local piece of state so we can re-render when the user toggles Yes/No
  const [prevEngaged, setPrevEngaged] = useState(data.prevEngaged || '')

  // Whenever the parent passes new data (e.g. on load), sync our state
  useEffect(() => {
    setPrevEngaged(data.prevEngaged || '')
  }, [data.prevEngaged])

  return (
    <div className="space-y-6">
      {/* 1) R&D Engagement */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-700">
          Has your company previously engaged in R&D / innovation-related
          activities?*
        </legend>
        {['Yes', 'No'].map((opt) => (
          <label key={opt} className="inline-flex items-center mr-6">
            <input
              type="radio"
              name="prevEngaged"
              value={opt}
              checked={prevEngaged === opt}
              onChange={() => setPrevEngaged(opt)}
              className="form-radio text-blue-600"
              required
            />
            <span className="ml-2 text-gray-700">{opt}</span>
          </label>
        ))}
      </fieldset>

      {/* 2) Conditional number-of-years (only if Yes) */}
      {prevEngaged === 'Yes' && (
        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Number of years your company has been engaged in R&D /
            innovation-related activities*
          </span>
          <input
            type="number"
            name="yearsEngaged"
            defaultValue={data.yearsEngaged || ''}
            required
            min="0"
            className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            Hint: Enter only numeric values.
          </p>
        </label>
      )}

      {/* 3) Primary mode of conducting R&D */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-700">
          Does your company primarily conduct your R&D / innovation-related
          activities?*
        </legend>
        {[
          'In-house with existing team',
          'In-house and bring in outside experts',
          'Contract out to external partner'
        ].map((opt) => (
          <label key={opt} className="inline-flex items-center mr-6">
            <input
              type="radio"
              name="conductMode"
              value={opt}
              defaultChecked={data.conductMode === opt}
              className="form-radio text-blue-600"
              required
            />
            <span className="ml-2 text-gray-700">{opt}</span>
          </label>
        ))}
      </fieldset>

      {/* 4) Ever contracted out */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-700">
          Has your company ever contracted out your R&D / innovation-related
          activities to an external partner?*
        </legend>
        {['Yes', 'No'].map((opt) => (
          <label key={opt} className="inline-flex items-center mr-6">
            <input
              type="radio"
              name="everContracted"
              value={opt}
              defaultChecked={data.everContracted === opt}
              className="form-radio text-blue-600"
              required
            />
            <span className="ml-2 text-gray-700">{opt}</span>
          </label>
        ))}
      </fieldset>

      {/* 5) Ever collaborated with academia */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-700">
          Has your company ever collaborated with an academic institution on a
          collaborative R&D / innovation project?*
        </legend>
        {['Yes', 'No'].map((opt) => (
          <label key={opt} className="inline-flex items-center mr-6">
            <input
              type="radio"
              name="everCollaborated"
              value={opt}
              defaultChecked={data.everCollaborated === opt}
              className="form-radio text-blue-600"
              required
            />
            <span className="ml-2 text-gray-700">{opt}</span>
          </label>
        ))}
      </fieldset>
    </div>
  )
}
