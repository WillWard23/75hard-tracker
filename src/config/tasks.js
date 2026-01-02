// Task configurations for each user (stored in lowercase)
export const USER_TASKS = {
  abi: [
    'moisturise',
    'brush teeth (am)',
    'eat healthy',
    'steps',
    'read',
    'workout',
    'brush teeth (pm)',
    'low spend'
  ],
  will: [
    'shave',
    'brush teeth',
    'hobby',
    'steps',
    'read',
    'workout',
    'drink',
    '2000 cal'
  ]
}

// Helper to capitalize task names for display
export function formatTaskName(taskName) {
  // Handle special cases
  if (taskName === '2000 cal') return '2000 cal'
  if (taskName === 'brush teeth (am)') return 'Brush Teeth (AM)'
  if (taskName === 'brush teeth (pm)') return 'Brush Teeth (PM)'
  
  // Capitalize first letter of each word
  return taskName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Map user keys to display names
export const USER_NAMES = {
  user1: 'Abi',
  user2: 'Will'
}

// Get tasks for a user key
export function getTasksForUser(userKey) {
  const name = USER_NAMES[userKey]?.toLowerCase()
  return USER_TASKS[name] || []
}

