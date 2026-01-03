import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getCurrentDay, updateWeight } from '../services/challengeService'
import { USER_NAMES } from '../config/tasks'

export default function Weight({ challengeData }) {
  const currentDay = getCurrentDay(challengeData.startDate)
  const days = Array.from({ length: 75 }, (_, i) => i + 1)
  
  // Get current day weights
  const currentDayKey = currentDay.toString()
  const currentDayData = challengeData.days?.[currentDayKey] || {}
  const user1Weight = currentDayData.user1?.weight || ''
  const user2Weight = currentDayData.user2?.weight || ''

  const [user1Input, setUser1Input] = useState(user1Weight.toString())
  const [user2Input, setUser2Input] = useState(user2Weight.toString())

  // Sync state with data changes
  useEffect(() => {
    setUser1Input(user1Weight.toString())
    setUser2Input(user2Weight.toString())
  }, [user1Weight, user2Weight])
  
  // Prepare data for chart
  const chartData = days.map((dayNumber) => {
    const dayKey = dayNumber.toString()
    const dayData = challengeData.days?.[dayKey] || {}
    const user1Data = dayData.user1 || {}
    const user2Data = dayData.user2 || {}
    
    return {
      day: dayNumber,
      [USER_NAMES.user1]: user1Data.weight || null,
      [USER_NAMES.user2]: user2Data.weight || null
    }
  })

  const handleWeightChange = async (userKey, value) => {
    const numValue = value === '' ? '' : parseFloat(value)
    
    if (userKey === 'user1') {
      setUser1Input(value)
    } else {
      setUser2Input(value)
    }

    // Update in database
    if (currentDay >= 1 && currentDay <= 75) {
      await updateWeight(currentDay, userKey, numValue)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Weight Tracking</h1>
        <p className="text-gray-600">Track your weight progress over the 75-day challenge</p>
      </div>

      {/* Weight Input for Current Day */}
      {currentDay >= 1 && currentDay <= 75 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Today's Weight (Day {currentDay})
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {USER_NAMES.user1} (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={user1Input}
                onChange={(e) => handleWeightChange('user1', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter weight"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {USER_NAMES.user2} (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={user2Input}
                onChange={(e) => handleWeightChange('user2', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter weight"
              />
            </div>
          </div>
        </div>
      )}

      {/* Weight Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Weight Progress</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="day" 
              label={{ value: 'Day', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey={USER_NAMES.user1} 
              stroke="#ec4899" 
              strokeWidth={2}
              dot={{ r: 4 }}
              connectNulls={false}
            />
            <Line 
              type="monotone" 
              dataKey={USER_NAMES.user2} 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ r: 4 }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

