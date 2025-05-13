// src/components/steps/Step1.jsx
import React from 'react'

export default function Step1({ data = {} }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Company Information */}
      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-gray-700">Company Name*</span>
        <input
          name="companyName"
          required
          defaultValue={data.companyName || ''}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          CRA Business Number*
        </span>
        <input
          name="craNumber"
          required
          defaultValue={data.craNumber || ''}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          Year of Incorporation*
        </span>
        <input
          type="number"
          name="yearOfIncorporation"
          required
          defaultValue={data.yearOfIncorporation || ''}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          Employees on Payroll*
        </span>
        <input
          type="number"
          name="employeeCount"
          required
          defaultValue={data.employeeCount || ''}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </label>

      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-gray-700">
          Primary Industrial Sector*
        </span>
        <select
          name="industrialSector"
          required
          defaultValue={data.industrialSector || ''}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            – Select –
          </option>
          <option>Manufacturing</option>
          <option>IT Services</option>
          <option>Biotechnology</option>
        </select>
      </label>

      {/* Address */}
      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-gray-700">
          Street Address Line 1*
        </span>
        <input
          name="address1"
          required
          defaultValue={data.address1 || ''}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </label>

      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-gray-700">
          Address Line 2 (Optional)
        </span>
        <input
          name="address2"
          defaultValue={data.address2 || ''}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">City*</span>
        <input
          name="city"
          required
          defaultValue={data.city || ''}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          Province/Territory*
        </span>
        <select
          name="province"
          required
          defaultValue={data.province || ''}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            – Select –
          </option>
          <option>British Columbia</option>
          <option>Ontario</option>
          <option>Quebec</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Postal Code*</span>
        <input
          name="postalCode"
          required
          defaultValue={data.postalCode || ''}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Country*</span>
        <select
          name="country"
          required
          defaultValue={data.country || 'Canada'}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option>Canada</option>
          <option>United States</option>
        </select>
      </label>

      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-gray-700">
          Company Website (Optional)
        </span>
        <input
          name="website"
          type="url"
          defaultValue={data.website || ''}
          placeholder="https://example.com"
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </label>

      {/* ITA/CEA Information */}
      <div className="md:col-span-2 border-t pt-4" />

      <fieldset className="md:col-span-2 space-y-2">
        <legend className="text-sm font-medium text-gray-700">
          How did you learn about the Interactive Visits Program?*
        </legend>
        {[
          'NRC IRAP ITA/CEA',
          'Technology Access Centre',
          'Other (please specify)'
        ].map((opt) => (
          <label key={opt} className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="learnAbout"
              value={opt}
              defaultChecked={data.learnAbout === opt}
              className="form-radio text-blue-600"
              required
            />
            <span className="ml-2 text-gray-700">{opt}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="md:col-span-2 space-y-2">
        <legend className="text-sm font-medium text-gray-700">
          I request:*
        </legend>
        {[
          'An Interactive Visit of 20 hours with one TAC',
          'A Strategic Interaction of 55 hours with two TACs'
        ].map((opt) => (
          <label key={opt} className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="requestType"
              value={opt}
              defaultChecked={data.requestType === opt}
              className="form-radio text-blue-600"
              required
            />
            <span className="ml-2 text-gray-700">{opt}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="md:col-span-2 space-y-2">
        <legend className="text-sm font-medium text-gray-700">I am:*</legend>
        {['Existing IRAP client', 'New IRAP client'].map((opt) => (
          <label key={opt} className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="clientStatus"
              value={opt}
              defaultChecked={data.clientStatus === opt}
              className="form-radio text-blue-600"
              required
            />
            <span className="ml-2 text-gray-700">{opt}</span>
          </label>
        ))}
      </fieldset>

      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-gray-700">
          Name of ITA/CEA who referred you for an Interactive Visit*
        </span>
        <input
          name="referrerName"
          required
          defaultValue={data.referrerName || ''}
          className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </label>

      <label className="block md:col-span-2">
        <span className="text-sm font-medium text-gray-700">
          Email Address*
        </span>
        <div className="flex">
          <input
            name="referrerEmailLocal"
            required
            defaultValue={data.referrerEmailLocal || ''}
            placeholder="username"
            className="mt-1 block flex-1 border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="mt-1 inline-flex items-center px-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-gray-700">
            @nrc-cnrc.gc.ca
          </span>
        </div>
      </label>

      <div className="md:col-span-2 flex space-x-4">
        <label className="flex-1 block">
          <span className="text-sm font-medium text-gray-700">
            Phone Number*
          </span>
          <input
            name="referrerPhone"
            required
            defaultValue={data.referrerPhone || ''}
            className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
        <label className="flex-1 block">
          <span className="text-sm font-medium text-gray-700">
            Phone Extension (Optional)
          </span>
          <input
            name="referrerExt"
            defaultValue={data.referrerExt || ''}
            className="mt-1 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
      </div>

      <fieldset className="md:col-span-2 space-y-2">
        <legend className="text-sm font-medium text-gray-700">
          Did your ITA/CEA refer you for the Interactive Visit?*
        </legend>
        {['Yes', 'No'].map((opt) => (
          <label key={opt} className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="referralConfirmed"
              value={opt}
              defaultChecked={data.referralConfirmed === opt}
              className="form-radio text-blue-600"
              required
            />
            <span className="ml-2 text-gray-700">{opt}</span>
          </label>
        ))}
      </fieldset>

      {/* EDI Disclosure */}
      <fieldset className="md:col-span-2 space-y-2 border-t pt-4">
        <legend className="text-sm font-medium text-gray-700">
          Is your business majority-owned by under-represented groups?
        </legend>
        {['Yes', 'No', "Don't know", 'Decline to answer'].map((opt) => (
          <label key={opt} className="inline-flex items-center mr-4">
            <input
              type="radio"
              name="ediOwnership"
              value={opt}
              defaultChecked={data.ediOwnership === opt}
              className="form-radio text-blue-600"
            />
            <span className="ml-2 text-gray-700">{opt}</span>
          </label>
        ))}
      </fieldset>
    </div>
  )
}
