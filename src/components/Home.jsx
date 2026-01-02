import { getCurrentDay, toggleDayCompletion } from '../services/challengeService'

export default function Home({ challengeData }) {
  const currentDay = getCurrentDay(challengeData.startDate)
  const todayKey = currentDay.toString()
  const todayData = challengeData.days?.[todayKey] || {}
  const user1Complete = todayData.user1 || false
  const user2Complete = todayData.user2 || false

  const handleToggle = async (userKey) => {
    if (currentDay < 1 || currentDay > 75) return
    await toggleDayCompletion(currentDay, userKey)
  }

  const getProgressPercentage = () => {
    if (currentDay < 1) return 0
    if (currentDay > 75) return 100
    return Math.round((currentDay / 75) * 100)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Day {currentDay > 0 ? currentDay : '--'} of 75
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

      {currentDay >= 1 && currentDay <= 75 ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Today's Progress
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Abi
              </label>
              <button
                onClick={() => handleToggle('user1')}
                className={`w-16 h-16 rounded-lg border-2 transition-all ${
                  user1Complete
                    ? 'bg-green-500 border-green-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400 hover:border-gray-400'
                }`}
              >
                {user1Complete ? (
                  <svg
                    className="w-8 h-8 mx-auto"
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
                ) : (
                  <svg
                    className="w-8 h-8 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="text-center">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Will
              </label>
              <button
                onClick={() => handleToggle('user2')}
                className={`w-16 h-16 rounded-lg border-2 transition-all ${
                  user2Complete
                    ? 'bg-green-500 border-green-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400 hover:border-gray-400'
                }`}
              >
                {user2Complete ? (
                  <svg
                    className="w-8 h-8 mx-auto"
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
                ) : (
                  <svg
                    className="w-8 h-8 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : currentDay > 75 ? (
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

