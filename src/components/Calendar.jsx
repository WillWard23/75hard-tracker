import { getCurrentDay, toggleDayCompletion } from '../services/challengeService'

export default function Calendar({ challengeData }) {
  const currentDay = getCurrentDay(challengeData.startDate)
  const days = Array.from({ length: 75 }, (_, i) => i + 1)

  const handleDayClick = async (dayNumber, userKey = null) => {
    if (dayNumber > currentDay) return // Can't toggle future days
    
    // If userKey is provided, toggle that specific user
    // Otherwise, toggle user1 (default behavior)
    const userToToggle = userKey || 'user1'
    await toggleDayCompletion(dayNumber, userToToggle)
  }

  const getDayStatus = (dayNumber) => {
    const dayKey = dayNumber.toString()
    const dayData = challengeData.days?.[dayKey] || {}
    return {
      user1: dayData.user1 || false,
      user2: dayData.user2 || false,
      isToday: dayNumber === currentDay,
      isPast: dayNumber < currentDay,
      isFuture: dayNumber > currentDay
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendar View</h1>
        <p className="text-gray-600">Click a day or user indicator to toggle completion</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-[repeat(15,minmax(0,1fr))] gap-2">
          {days.map((dayNumber) => {
            const status = getDayStatus(dayNumber)
            const bothComplete = status.user1 && status.user2
            const oneComplete = status.user1 || status.user2

            return (
              <div
                key={dayNumber}
                className={`
                  aspect-square rounded-lg border-2 transition-all relative
                  ${status.isToday ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                  ${status.isFuture ? 'opacity-50' : ''}
                  ${
                    bothComplete
                      ? 'bg-green-500 border-green-600'
                      : oneComplete
                      ? 'bg-yellow-400 border-yellow-500'
                      : status.isPast
                      ? 'bg-red-100 border-red-300'
                      : 'bg-gray-100 border-gray-300'
                  }
                `}
              >
                <button
                  onClick={() => handleDayClick(dayNumber)}
                  disabled={status.isFuture}
                  className="w-full h-full flex flex-col items-center justify-center text-xs font-medium cursor-pointer hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100"
                  title={`Day ${dayNumber}${status.isToday ? ' (Today)' : ''} - Click to toggle Me`}
                >
                  <span
                    className={
                      bothComplete || oneComplete ? 'text-white' : 'text-gray-600'
                    }
                  >
                    {dayNumber}
                  </span>
                </button>
                <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDayClick(dayNumber, 'user1')
                    }}
                    disabled={status.isFuture}
                    className={`
                      w-2 h-2 rounded-full transition-all
                      ${status.user1 ? 'bg-white ring-1 ring-white' : 'bg-transparent border border-white/50'}
                      ${status.isFuture ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-125'}
                    `}
                    title="Toggle Me"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDayClick(dayNumber, 'user2')
                    }}
                    disabled={status.isFuture}
                    className={`
                      w-2 h-2 rounded-full transition-all
                      ${status.user2 ? 'bg-white ring-1 ring-white' : 'bg-transparent border border-white/50'}
                      ${status.isFuture ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-125'}
                    `}
                    title="Toggle Partner"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Legend</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-green-500 border-2 border-green-600"></div>
            <span className="text-gray-700">Both Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-yellow-400 border-2 border-yellow-500"></div>
            <span className="text-gray-700">One Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-red-100 border-2 border-red-300"></div>
            <span className="text-gray-700">Incomplete</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gray-100 border-2 border-gray-300 ring-2 ring-blue-500"></div>
            <span className="text-gray-700">Today</span>
          </div>
        </div>
      </div>
    </div>
  )
}

