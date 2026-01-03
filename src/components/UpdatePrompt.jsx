import { useState, useEffect } from 'react'

export default function UpdatePrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [updateServiceWorker, setUpdateServiceWorker] = useState(null)

  useEffect(() => {
    // Check for service worker updates
    if ('serviceWorker' in navigator) {
      let refreshing = false

      // Listen for service worker updates
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return
        refreshing = true
        window.location.reload()
      })

      // Check for updates periodically
      const checkForUpdates = async () => {
        try {
          const registration = await navigator.serviceWorker.getRegistration()
          if (registration) {
            // Check for updates every 5 minutes
            setInterval(async () => {
              await registration.update()
            }, 5 * 60 * 1000)

            // Listen for waiting service worker
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New service worker is waiting
                    setUpdateServiceWorker(() => () => {
                      newWorker.postMessage({ type: 'SKIP_WAITING' })
                    })
                    setShowPrompt(true)
                  }
                })
              }
            })

            // Check immediately
            await registration.update()
          }
        } catch (error) {
          console.error('Service worker update check failed:', error)
        }
      }

      checkForUpdates()
    }
  }, [])

  const handleUpdate = () => {
    if (updateServiceWorker) {
      updateServiceWorker()
    }
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-50">
      <div className="bg-white rounded-lg shadow-lg border-2 border-blue-500 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">Update Available</h3>
            <p className="text-sm text-gray-600 mb-3">
              A new version of the app is available. Refresh to get the latest features.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Update Now
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

