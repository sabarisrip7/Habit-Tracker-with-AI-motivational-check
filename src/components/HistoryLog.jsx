import React from 'react'
import { todayStr, HABITS } from '../utils/helpers'

const unitShort = { glasses: 'g', minutes: 'min', hours: 'h' }

const HistoryLog = ({ logs, onClear }) => {
  const sorted = [...logs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 7)

  return (
    <div style={{
      background: 'var(--surface)', borderRadius: 'var(--radius)',
      border: '1px solid var(--border)', padding: '18px 20px',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: 14,
      }}>
        <div style={{
          fontSize: 13, fontWeight: 700, color: 'var(--muted)',
          textTransform: 'uppercase', letterSpacing: '0.6px',
        }}>
          📅 Recent Log
        </div>
        {logs.length > 0 && (
          <button
            onClick={onClear}
            style={{
              fontSize: 12, color: 'var(--danger)', background: 'none',
              border: 'none', cursor: 'pointer', padding: '2px 6px',
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {!sorted.length ? (
        <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 13, padding: '12px 0' }}>
          No logs yet. Start tracking today!
        </div>
      ) : (
        sorted.map((log) => {
          const d = new Date(log.date + 'T12:00:00')
          const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          const isToday = log.date === todayStr()

          return (
            <div key={log.date} style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '10px 0',
              borderBottom: '1px solid var(--border)',
            }}>
              <span style={{ color: 'var(--muted)', fontSize: 13 }}>
                {label}{isToday ? ' (Today)' : ''}
              </span>
              <div style={{ display: 'flex', gap: 6 }}>
                {HABITS.filter((h) => log[h.id] !== undefined).map((h) => (
                  <span key={h.id} style={{
                    padding: '3px 9px', borderRadius: 12,
                    fontSize: 11, fontWeight: 600,
                    background: `var(--${h.type}-bg)`,
                    color: `var(--${h.type})`,
                  }}>
                    {h.icon} {log[h.id]}{unitShort[h.unit]}
                  </span>
                ))}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default HistoryLog