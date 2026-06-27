import { useState, useEffect } from 'react'
import { todayStr, HABITS } from '../utils/helpers'

const STORAGE_KEY = 'habitflow_logs'

const getInitialValues = () => {
  const vals = {}
  HABITS.forEach((h) => { vals[h.id] = h.defaultVal })
  return vals
}

export const useHabits = () => {
  const [logs, setLogs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })

  const [values, setValues] = useState(getInitialValues)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
  }, [logs])

  const todayLog = logs.find((l) => l.date === todayStr()) || null

  const updateValue = (habitId, val) => {
    setValues((prev) => ({ ...prev, [habitId]: parseFloat(val) }))
  }

  const logHabit = (habitId) => {
    const today = todayStr()
    setLogs((prev) => {
      const existing = prev.find((l) => l.date === today)
      if (existing) {
        return prev.map((l) =>
          l.date === today ? { ...l, [habitId]: values[habitId] } : l
        )
      }
      return [...prev, { date: today, [habitId]: values[habitId] }]
    })
  }

  const clearAll = () => {
    if (window.confirm('Clear all habit data? This cannot be undone.')) {
      setLogs([])
    }
  }

  return { logs, values, todayLog, updateValue, logHabit, clearAll }
}