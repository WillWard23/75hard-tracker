import { useState, useEffect } from 'react'
import Home from './components/Home'
import Calendar from './components/Calendar'
import Settings from './components/Settings'
import Weight from './components/Weight'
import Calories from './components/Calories'
import { subscribeToChallenge } from './services/challengeService'

function App() {
  const [challengeData, setChallengeData] = useState(null)
  const [activeView, setActiveView] = useState('home')
  const [selectedDay, setSelectedDay] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToChallenge((data) => {
      setChallengeData(data)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <button
                onClick={() => { setActiveView('home'); setSelectedDay(null); }}
                className={`px-4 py-2 text-sm font-medium ${
                  activeView === 'home'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveView('calendar')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeView === 'calendar'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => setActiveView('weight')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeView === 'weight'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Weight
              </button>
              <button
                onClick={() => setActiveView('calories')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeView === 'calories'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Calories
              </button>
              <button
                onClick={() => setActiveView('settings')}
                className={`px-4 py-2 text-sm font-medium ${
                  activeView === 'settings'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'home' && challengeData && (
          <Home challengeData={challengeData} selectedDay={selectedDay} onClearSelectedDay={() => setSelectedDay(null)} />
        )}
        {activeView === 'calendar' && challengeData && (
          <Calendar challengeData={challengeData} onDayClick={(day) => { setSelectedDay(day); setActiveView('home'); }} />
        )}
        {activeView === 'weight' && challengeData && (
          <Weight challengeData={challengeData} />
        )}
        {activeView === 'calories' && challengeData && (
          <Calories challengeData={challengeData} />
        )}
        {activeView === 'settings' && challengeData && (
          <Settings challengeData={challengeData} />
        )}
      </main>
    </div>
  )
}

export default App

