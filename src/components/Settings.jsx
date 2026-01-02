import { useState } from 'react'
import { updateStartDate, resetChallenge } from '../services/challengeService'

export default function Settings({ challengeData }) {
  const [startDate, setStartDate] = useState(challengeData.startDate || '')
  const [isResetting, setIsResetting] = useState(false)

  const handleUpdateStartDate = async (e) => {
    e.preventDefault()
    if (startDate) {
      await updateStartDate(startDate)
      alert('Start date updated successfully!')
    }
  }

  const handleReset = async () => {
    if (
      !window.confirm(
        'Are you sure you want to reset the challenge? This will clear all progress data!'
      )
    ) {
      return
    }

    setIsResetting(true)
    const newStartDate = prompt(
      'Enter new start date (YYYY-MM-DD) or leave empty to use today:'
    )
    
    if (newStartDate === null) {
      setIsResetting(false)
      return
    }

    const dateToUse = newStartDate || new Date().toISOString().split('T')[0]
    await resetChallenge(dateToUse)
    setStartDate(dateToUse)
    setIsResetting(false)
    alert('Challenge reset successfully!')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Challenge Start Date
          </h2>
          <form onSubmit={handleUpdateStartDate} className="space-y-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update Start Date
            </button>
          </form>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Danger Zone
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Reset the challenge to start over. This will clear all progress data
            and cannot be undone.
          </p>
          <button
            onClick={handleReset}
            disabled={isResetting}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResetting ? 'Resetting...' : 'Reset Challenge'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Current Status
        </h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Start Date:</span>
            <span className="font-medium text-gray-900">
              {challengeData.startDate || 'Not set'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Days Tracked:</span>
            <span className="font-medium text-gray-900">
              {Object.keys(challengeData.days || {}).length} / 75
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

