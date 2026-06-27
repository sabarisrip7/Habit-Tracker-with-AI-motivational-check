import React from 'react'
import { computeStreak, HABITS } from '../utils/helpers'

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginBottom: '20px',
  },
  card: {
    background: 'var(--surface)',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)',
    padding: '12px 14px',
    textAlign: 'center',
  },
  val: { fontSize: '22px', fontWeight: 700 },
  lbl: {
    fontSize: '11px',
    color: 'var(--muted)',
    marginTop: '2px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
}

const StatsBar = ({ logs }) => {
  if (!logs.length) return null

  const bestStreak = Math.max(...HABITS.map((h) => computeStreak(logs, h.id)))

  const total = logs.length * 3
  let done = 0
  logs.forEach((l) => {
    HABITS.forEach((h) => { if (l[h.id] !== undefined) done++ })
  })
  const rate = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div style={styles.grid}>
      <div style={styles.card}>
        <div style={styles.val}>{logs.length}</div>
        <div style={styles.lbl}>Days Logged</div>
      </div>
      <div style={styles.card}>
        <div style={styles.val}>{bestStreak}🔥</div>
        <div style={styles.lbl}>Best Streak</div>
      </div>
      <div style={styles.card}>
        <div style={styles.val}>{rate}%</div>
        <div style={styles.lbl}>Completion</div>
      </div>
    </div>
  )
}

export default StatsBar