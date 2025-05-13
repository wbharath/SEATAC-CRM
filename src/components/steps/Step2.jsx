// src/components/steps/Step2.jsx
import React from 'react'

export default function Step2({ data = {} }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Contact First Name */}
      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          Contact First Name*
        </span>
        <input
          name="contactFirstName"
          required
          defaultValue={data.contactFirstName || ''}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </label>

      {/* Contact Last Name */}
      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          Contact Last Name*
        </span>
        <input
          name="contactLastName"
          required
          defaultValue={data.contactLastName || ''}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </label>

      {/* Position */}
      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-gray-700">Position*</span>
        <input
          name="position"
          required
          defaultValue={data.position || ''}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </label>

      {/* Preferred Method of Contact */}
      <fieldset className="md:col-span-2 space-y-2">
        <legend className="text-sm font-medium text-gray-700">
          Preferred method of contact*
        </legend>
        {['Email', 'Phone'].map((opt) => (
          <label key={opt} className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="preferredContact"
              value={opt}
              defaultChecked={data.preferredContact === opt}
              className="form-radio text-blue-600"
              required
            />
            <span className="ml-2 text-gray-700">{opt}</span>
          </label>
        ))}
      </fieldset>

      {/* Communication Language */}
      <fieldset className="md:col-span-2 space-y-2">
        <legend className="text-sm font-medium text-gray-700">
          Communication Language*
        </legend>
        {['English', 'French'].map((opt) => (
          <label key={opt} className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="communicationLanguage"
              value={opt}
              defaultChecked={data.communicationLanguage === opt}
              className="form-radio text-blue-600"
              required
            />
            <span className="ml-2 text-gray-700">{opt}</span>
          </label>
        ))}
      </fieldset>

      {/* Email Address */}
      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-gray-700">
          Email Address*
        </span>
        <input
          name="contactEmail"
          type="email"
          required
          defaultValue={data.contactEmail || ''}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </label>

      {/* Phone Number */}
      <label className="block">
        <span className="text-sm font-medium text-gray-700">Phone Number*</span>
        <input
          name="contactPhone"
          required
          defaultValue={data.contactPhone || ''}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </label>

      {/* Phone Extension */}
      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          Phone Extension (Optional)
        </span>
        <input
          name="contactExtension"
          defaultValue={data.contactExtension || ''}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </label>
    </div>
  )
}
