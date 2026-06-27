import React from 'react'
import { computeStreak, getLastNDates, dayLabel } from '../utils/helpers'

const HabitCard = ({ habit, logs, value, onUpdate, onLog, todayLog }) => {
  const streak = computeStreak(logs, habit.id)
  const alreadyLogged = todayLog && todayLog[habit.id] !== undefined
  const last7 = getLastNDates(7)

  const cardStyle = {
    background: alreadyLogged ? '#f9fffb' : 'var(--surface)',
    borderRadius: 'var(--radius)',
    border: `1.5px solid ${alreadyLogged ? 'var(--success)' : 'var(--border)'}`,
    padding: '18px 20px',
    boxShadow: 'var(--shadow)',
    transition: 'border-color 0.2s',
  }

  return (
    <div style={cardStyle}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: `var(--${habit.type}-bg)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, flexShrink: 0,
        }}>
          {habit.icon}
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{habit.name}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>
            Goal: {habit.goal} {habit.unit}/day
          </div>
        </div>
        <div style={{
          marginLeft: 'auto',
          background: streak >= 3 ? '#fff3e0' : 'var(--accent-light)',
          color: streak >= 3 ? '#e65100' : 'var(--accent)',
          fontSize: 12, fontWeight: 700,
          padding: '4px 10px', borderRadius: 20,
          whiteSpace: 'nowrap',
        }}>
          {streak >= 3 ? '🔥' : '⚡'} {streak}d
        </div>
      </div>

      {/* Input */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {habit.inputType === 'range' ? (
          <input
            type="range"
            min={habit.min} max={habit.max} step={habit.step}
            value={value} disabled={alreadyLogged}
            onChange={(e) => onUpdate(habit.id, e.target.value)}
            style={{ flex: 1, accentColor: `var(--${habit.type})` }}
          />
        ) : (
          <input
            type="number"
            min={habit.min} max={habit.max} step={habit.step}
            value={value} disabled={alreadyLogged}
            onChange={(e) => onUpdate(habit.id, e.target.value)}
            style={{
              width: 100, border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius-sm)', padding: '8px 12px',
              fontSize: 15, color: 'var(--text)', background: 'var(--bg)', outline: 'none',
            }}
          />
        )}
        <div style={{
          fontSize: 15, fontWeight: 600, minWidth: 70,
          textAlign: 'right', color: `var(--${habit.type})`,
        }}>
          {value} {habit.unit}
        </div>
      </div>

      {/* Log Button */}
      <button
        onClick={() => !alreadyLogged && onLog(habit.id)}
        disabled={alreadyLogged}
        style={{
          marginTop: 12, width: '100%', padding: '10px',
          borderRadius: 'var(--radius-sm)', border: 'none',
          fontSize: 14, fontWeight: 600,
          background: alreadyLogged ? 'var(--success-light)' : 'var(--accent)',
          color: alreadyLogged ? 'var(--success)' : '#fff',
          cursor: alreadyLogged ? 'default' : 'pointer',
          transition: 'background 0.2s',
        }}
      >
        {alreadyLogged ? '✓ Logged Today' : `Log ${habit.name}`}
      </button>

      {/* Week dots */}
      <div style={{ display: 'flex', gap: 5, marginTop: 12 }}>
        {last7.map((d) => {
          const log = logs.find((l) => l.date === d)
          const filled = log && log[habit.id] !== undefined
          return (
            <div key={d} title={d} style={{
              width: 22, height: 22, borderRadius: '50%',
              background: filled ? `var(--${habit.type})` : 'var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 600,
              color: filled ? '#fff' : 'var(--muted)',
            }}>
              {dayLabel(d)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HabitCard