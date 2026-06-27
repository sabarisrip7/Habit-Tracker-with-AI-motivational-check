import React from 'react'
import { HABITS } from './utils/helpers'
import { useHabits } from './hooks/useHabits'
import HabitCard from './components/HabitCard'
import AICoach from './components/AICoach'
import StatsBar from './components/StatsBar'
import HistoryLog from './components/HistoryLog'

const App = () => {
  const { logs, values, todayLog, updateValue, logHabit, clearAll } = useHabits()

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '24px 16px 60px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px' }}>
          Habit<span style={{ color: 'var(--accent)' }}>Flow</span> ✦
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>
          Track your daily habits. Get AI-powered motivation.
        </p>
        <span style={{
          display: 'inline-block', marginTop: 8,
          background: 'var(--accent-light)', color: 'var(--accent)',
          fontSize: 12, fontWeight: 600, padding: '4px 12px',
          borderRadius: 20, letterSpacing: '0.3px',
        }}>
          {today}
        </span>
      </div>

      {/* Stats */}
      <StatsBar logs={logs} />

      {/* Habit Cards */}
      <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
        {HABITS.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            logs={logs}
            value={values[habit.id]}
            onUpdate={updateValue}
            onLog={logHabit}
            todayLog={todayLog}
          />
        ))}
      </div>

      {/* AI Coach */}
      <AICoach logs={logs} todayLog={todayLog} />

      {/* History */}
      <HistoryLog logs={logs} onClear={clearAll} />
    </div>
  )
}

export default App