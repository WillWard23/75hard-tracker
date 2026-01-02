import { getCurrentDay, toggleTaskCompletion, updateWeight } from '../services/challengeService'
import { getTasksForUser, USER_NAMES, formatTaskName } from '../config/tasks'
import { useState, useEffect } from 'react'

export default function Home({ challengeData, selectedDay, onClearSelectedDay }) {
  const currentDay = getCurrentDay(challengeData.startDate)
  const displayDay = selectedDay !== null ? selectedDay : currentDay
  const dayKey = displayDay.toString()
  const dayData = challengeData.days?.[dayKey] || {}
  const user1Data = dayData.user1 || {}
  const user2Data = dayData.user2 || {}
  const user1Tasks = user1Data.tasks || {}
  const user2Tasks = user2Data.tasks || {}

  const user1TaskList = getTasksForUser('user1')
  const user2TaskList = getTasksForUser('user2')

  // Weight state
  const user1Weight = user1Data.weight || ''
  const user2Weight = user2Data.weight || ''
  const [user1WeightInput, setUser1WeightInput] = useState(user1Weight.toString())
  const [user2WeightInput, setUser2WeightInput] = useState(user2Weight.toString())

  // Update weight inputs when day data changes
  useEffect(() => {
    setUser1WeightInput(user1Weight.toString())
    setUser2WeightInput(user2Weight.toString())
  }, [user1Weight, user2Weight, displayDay])

  const handleTaskToggle = async (userKey, taskName) => {
    if (displayDay < 1 || displayDay > 75) return
    await toggleTaskCompletion(displayDay, userKey, taskName)
  }

  const handleWeightChange = async (userKey, value) => {
    const numValue = value === '' ? '' : parseFloat(value)
    
    if (userKey === 'user1') {
      setUser1WeightInput(value)
    } else {
      setUser2WeightInput(value)
    }

    // Update in database
    if (displayDay >= 1 && displayDay <= 75) {
      await updateWeight(displayDay, userKey, numValue)
    }
  }

  const getProgressPercentage = () => {
    if (displayDay < 1) return 0
    if (displayDay > 75) return 100
    return Math.round((displayDay / 75) * 100)
  }

  const isSelectedDay = selectedDay !== null && selectedDay !== currentDay

  return (
    <div className="space-y-8">
      <div className="text-center">
        {isSelectedDay && (
          <button
            onClick={onClearSelectedDay}
            className="mb-4 text-sm text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to Today
          </button>
        )}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Day {displayDay > 0 ? displayDay : '--'} of 75
          {isSelectedDay && <span className="text-lg text-gray-500 ml-2">(Viewing)</span>}
        </h1>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {getProgressPercentage()}% Complete
          </p>
        </div>
      </div>

      {displayDay >= 1 && displayDay <= 75 ? (
        <div className="space-y-6">
          {/* Abi's Tasks */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              {USER_NAMES.user1}'s Tasks
            </h2>
            {(() => {
              const completedCount = user1TaskList.filter(task => user1Tasks[task]).length
              const totalCount = user1TaskList.length
              const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
              return (
                <div className="mb-4">
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                    <span>{completedCount} of {totalCount} complete</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              )
            })()}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {user1TaskList.map((task) => {
                const isComplete = user1Tasks[task] || false
                return (
                  <button
                    key={task}
                    onClick={() => handleTaskToggle('user1', task)}
                    className={`
                      p-4 rounded-lg border-2 transition-all text-center cursor-pointer hover:scale-105
                      ${isComplete
                        ? 'bg-green-500 border-green-600 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                      }
                    `}
                  >
                    <div className="font-medium text-sm">{formatTaskName(task)}</div>
                    {isComplete && (
                      <svg
                        className="w-6 h-6 mx-auto mt-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
            {/* Weight Input for Abi */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={user1WeightInput}
                onChange={(e) => handleWeightChange('user1', e.target.value)}
                className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter weight"
              />
            </div>
          </div>

          {/* Will's Tasks */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              {USER_NAMES.user2}'s Tasks
            </h2>
            {(() => {
              const completedCount = user2TaskList.filter(task => user2Tasks[task]).length
              const totalCount = user2TaskList.length
              const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
              return (
                <div className="mb-4">
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                    <span>{completedCount} of {totalCount} complete</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              )
            })()}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {user2TaskList.map((task) => {
                const isComplete = user2Tasks[task] || false
                return (
                  <button
                    key={task}
                    onClick={() => handleTaskToggle('user2', task)}
                    className={`
                      p-4 rounded-lg border-2 transition-all text-center cursor-pointer hover:scale-105
                      ${isComplete
                        ? 'bg-green-500 border-green-600 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                      }
                    `}
                  >
                    <div className="font-medium text-sm">{formatTaskName(task)}</div>
                    {isComplete && (
                      <svg
                        className="w-6 h-6 mx-auto mt-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
            {/* Weight Input for Will */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={user2WeightInput}
                onChange={(e) => handleWeightChange('user2', e.target.value)}
                className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter weight"
              />
            </div>
          </div>
        </div>
      ) : displayDay > 75 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            🎉 Challenge Complete! 🎉
          </h2>
          <p className="text-gray-600">
            Congratulations on completing the 75 Hard challenge!
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-600">
            Challenge hasn't started yet. Update the start date in Settings.
          </p>
        </div>
      )}
    </div>
  )
}
