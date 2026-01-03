import { useState, useEffect } from 'react'
import { getCurrentDay, updateCalories } from '../services/challengeService'
import { USER_NAMES } from '../config/tasks'

export default function Calories({ challengeData }) {
  const currentDay = getCurrentDay(challengeData.startDate)
  const [selectedDay, setSelectedDay] = useState(currentDay)
  const [selectedUser, setSelectedUser] = useState('user1')
  const [foodEntries, setFoodEntries] = useState([])

  const displayDay = selectedDay >= 1 && selectedDay <= 75 ? selectedDay : currentDay
  const dayKey = displayDay.toString()
  const dayData = challengeData.days?.[dayKey] || {}

  // Load calories data for selected user and day
  useEffect(() => {
    const userData = dayData[selectedUser] || {}
    const calories = userData.calories || []
    setFoodEntries(calories.length > 0 ? calories : [{ food: '', calories: '' }])
  }, [dayData, selectedUser, displayDay])

  // Calculate total calories
  const totalCalories = foodEntries.reduce((sum, entry) => {
    const cal = parseFloat(entry.calories) || 0
    return sum + cal
  }, 0)

  const handleFoodChange = (index, field, value) => {
    const updated = [...foodEntries]
    updated[index] = { ...updated[index], [field]: value }
    setFoodEntries(updated)
    saveCalories(updated)
  }

  const handleAddRow = () => {
    const updated = [...foodEntries, { food: '', calories: '' }]
    setFoodEntries(updated)
  }

  const handleRemoveRow = (index) => {
    if (foodEntries.length > 1) {
      const updated = foodEntries.filter((_, i) => i !== index)
      setFoodEntries(updated)
      saveCalories(updated)
    }
  }

  const saveCalories = async (entries) => {
    // Filter out empty entries
    const filtered = entries.filter(entry => entry.food.trim() || entry.calories)
    // Convert calories to numbers where possible
    const cleaned = filtered.map(entry => ({
      food: entry.food.trim(),
      calories: entry.calories === '' ? '' : (parseFloat(entry.calories) || 0)
    }))
    
    if (displayDay >= 1 && displayDay <= 75) {
      await updateCalories(displayDay, selectedUser, cleaned)
    }
  }

  const handleDayChange = (e) => {
    const day = parseInt(e.target.value)
    if (!isNaN(day) && day >= 1 && day <= 75) {
      setSelectedDay(day)
    }
  }

  const isSelectedDay = selectedDay !== currentDay

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Calories</h1>
        <p className="text-gray-600">Track daily food intake</p>
      </div>

      {/* Day Selector */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">
              Day:
            </label>
            <input
              type="number"
              min="1"
              max="75"
              value={selectedDay}
              onChange={handleDayChange}
              className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="text-sm text-gray-600">of 75</span>
            {isSelectedDay && (
              <button
                onClick={() => setSelectedDay(currentDay)}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Back to Today
              </button>
            )}
          </div>
          {!isSelectedDay && (
            <span className="text-sm text-gray-500">Today</span>
          )}
        </div>
      </div>

      {/* Person Selector */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Person
        </label>
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedUser('user1')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              selectedUser === 'user1'
                ? 'bg-pink-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {USER_NAMES.user1}
          </button>
          <button
            onClick={() => setSelectedUser('user2')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              selectedUser === 'user2'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {USER_NAMES.user2}
          </button>
        </div>
      </div>

      {/* Total Calories */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Total Calories</p>
          <p className="text-4xl font-bold text-gray-900">{totalCalories.toLocaleString()}</p>
        </div>
      </div>

      {/* Food Entries */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-3">
          {foodEntries.map((entry, index) => (
            <div key={index} className="flex gap-3 items-center">
              <input
                type="text"
                value={entry.food}
                onChange={(e) => handleFoodChange(index, 'food', e.target.value)}
                onBlur={() => saveCalories(foodEntries)}
                placeholder="Food name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                value={entry.calories}
                onChange={(e) => handleFoodChange(index, 'calories', e.target.value)}
                onBlur={() => saveCalories(foodEntries)}
                placeholder="Calories"
                className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {foodEntries.length > 1 && (
                <button
                  onClick={() => handleRemoveRow(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-all"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleAddRow}
          className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all font-medium"
        >
          + Add Food
        </button>
      </div>
    </div>
  )
}

