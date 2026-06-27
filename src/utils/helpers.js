export const todayStr = () => new Date().toISOString().split('T')[0]

export const dayLabel = (dateStr) => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  return days[new Date(dateStr + 'T12:00:00').getDay()]
}

export const getLastNDates = (n) => {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (n - 1 - i))
    return d.toISOString().split('T')[0]
  })
}

export const computeStreak = (logs, habitId) => {
  const sorted = [...logs].sort((a, b) => b.date.localeCompare(a.date))
  let streak = 0
  let prev = null
  for (const log of sorted) {
    if (log[habitId] === undefined) continue
    if (!prev) { streak = 1; prev = log.date; continue }
    const diff = (new Date(prev) - new Date(log.date)) / 86400000
    if (diff === 1) { streak++; prev = log.date } else break
  }
  return streak
}

export const HABITS = [
  { id: 'water', name: 'Water Intake', icon: '💧', type: 'water', unit: 'glasses', min: 0, max: 16, step: 1, goal: 8, defaultVal: 8, inputType: 'number' },
  { id: 'exercise', name: 'Exercise', icon: '🏃', type: 'exercise', unit: 'minutes', min: 0, max: 120, step: 5, goal: 30, defaultVal: 30, inputType: 'range' },
  { id: 'sleep', name: 'Sleep', icon: '😴', type: 'sleep', unit: 'hours', min: 0, max: 12, step: 0.5, goal: 8, defaultVal: 7, inputType: 'range' },
]