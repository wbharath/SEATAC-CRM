// src/components/steps/Step4.jsx
import React, { useState, useEffect } from 'react'

const IMPACT_OPTIONS = [
  'Get new products or services in market',
  'Increase expenditures on R&D',
  'Export products or services',
  'Increase revenue from goods and services',
  'Hire new employees',
  'Purchase new equipment or technology',
  'Decrease costs from adopting new processes/technologies',
  'Protect existing employees',
  'Secure new equity financing',
  'Create new intellectual property',
  'Other'
]

export default function Step4({ data = {} }) {
  // track checkboxes for impacts + free‐text
  const [impacts, setImpacts] = useState(data.impacts || [])
  const [otherDetail, setOtherDetail] = useState(data.otherDetail || '')

  // initialize from passed‐in data once
  useEffect(() => {
    if (data.impacts) setImpacts(data.impacts)
    if (data.otherDetail) setOtherDetail(data.otherDetail)
  }, [data])

  const handleImpactChange = (e) => {
    const { value, checked } = e.target
    let next = checked
      ? [...impacts, value]
      : impacts.filter((i) => i !== value)

    // if they uncheck “Other”, clear that text
    if (value === 'Other' && !checked) {
      setOtherDetail('')
    }

    setImpacts(next)
  }

  return (
    <div className="space-y-6">
      <hr className="border-gray-300" />

      {/* 1. Innovation Challenge description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Brief description of the innovation challenge*
        </label>
        <textarea
          name="innovationDescription"
          defaultValue={data.innovationDescription || ''}
          required
          rows={5}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe your innovation challenge..."
        />
        <p className="mt-1 text-xs text-gray-500">
          Hint: Must be between 25 and 5012 characters.
        </p>
      </div>

      {/* 2. What has the company already done */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          What has the company already done to address this problem?*
        </label>
        <textarea
          name="addressedProblem"
          defaultValue={data.addressedProblem || ''}
          required
          rows={5}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Summarize past efforts..."
        />
        <p className="mt-1 text-xs text-gray-500">
          Hint: Must be between 25 and 5012 characters.
        </p>
      </div>

      {/* 3. Desired project outcomes */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Desired project outcomes*
        </label>
        <textarea
          name="desiredOutcomes"
          defaultValue={data.desiredOutcomes || ''}
          required
          rows={4}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          Hint: Must be between 25 and 5012 characters.
        </p>
      </div>

      {/* 4. Anticipated use of project results */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Anticipated use of project results*
        </label>
        <textarea
          name="anticipatedUse"
          defaultValue={data.anticipatedUse || ''}
          required
          rows={4}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          Hint: Must be between 25 and 5012 characters.
        </p>
      </div>

      {/* 5. Anticipated benefits */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Anticipated benefits to company*
        </label>
        <textarea
          name="anticipatedBenefits"
          defaultValue={data.anticipatedBenefits || ''}
          required
          rows={4}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          Hint: Must be between 25 and 5012 characters.
        </p>
      </div>

      {/* 6. Other comments */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Other comments*
        </label>
        <textarea
          name="otherComments"
          defaultValue={data.otherComments || ''}
          required
          rows={4}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          Hint: Must be between 25 and 5012 characters.
        </p>
      </div>

      {/* 7. File upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Upload any supporting documents (Optional)
        </label>
        <input
          type="file"
          name="supportingDocs"
          accept=".pdf,.docx,.png,.jpeg"
          className="mt-1 block w-full text-gray-700"
        />
        <p className="mt-1 text-xs text-gray-500">
          NOTE: Max 1 file, up to 5 MB. Allowed: .pdf, .docx, .png, .jpeg.
        </p>
      </div>

      {/* 8. Discussions with any TAC already */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-700">
          Have you had discussions about this challenge with any TAC or college
          already?*
        </legend>
        {['Yes', 'No'].map((opt) => (
          <label key={opt} className="inline-flex items-center mr-6">
            <input
              type="radio"
              name="discussionYesNo"
              value={opt}
              defaultChecked={data.discussionYesNo === opt}
              required
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-gray-700">{opt}</span>
          </label>
        ))}
      </fieldset>

      {/* 9. Market opportunity */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          What is the market opportunity you are targeting?*
        </label>
        <input
          type="text"
          name="marketOpportunity"
          defaultValue={data.marketOpportunity || ''}
          required
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          Hint: Must be between 3 and 1024 characters.
        </p>
      </div>

      {/* 10. Impacts checkboxes */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-700">
          Which of the following impacts are you hoping to achieve through this
          Interactive Visit? (Check all that apply):
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {IMPACT_OPTIONS.map((opt) => (
            <label key={opt} className="inline-flex items-center">
              <input
                type="checkbox"
                name="impacts"
                value={opt}
                checked={impacts.includes(opt)}
                onChange={handleImpactChange}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* 11. “Other” detail when checked */}
      {impacts.includes('Other') && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            If other, please specify*
          </label>
          <input
            type="text"
            name="otherDetail"
            value={otherDetail}
            onChange={(e) => setOtherDetail(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {/* hidden inputs so FormData captures the array & otherDetail */}
      <input type="hidden" name="impacts" value={impacts.join('||')} />
      {impacts.includes('Other') && (
        <input type="hidden" name="otherDetail" value={otherDetail} />
      )}
    </div>
  )
}
