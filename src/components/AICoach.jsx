import React, { useState } from 'react'
import { computeStreak, HABITS, todayStr } from '../utils/helpers'

const AICoach = ({ logs, todayLog }) => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const buildPrompt = () => {
    const context = `
User's Habit Tracker Summary (as of ${todayStr()}):
- Total days logged: ${logs.length}
- Today's log: ${todayLog ? JSON.stringify(todayLog) : 'Nothing logged yet today'}
- Streaks: Water=${computeStreak(logs, 'water')} days, Exercise=${computeStreak(logs, 'exercise')} days, Sleep=${computeStreak(logs, 'sleep')} days
- Goals: Water 8 glasses/day, Exercise 30 min/day, Sleep 8 hours/day
- Today's values:
${HABITS.map((h) =>
  todayLog && todayLog[h.id] !== undefined
    ? `  ${h.name}: ${todayLog[h.id]} ${h.unit} (Goal: ${h.goal})`
    : `  ${h.name}: Not logged yet`
).join('\n')}
    `.trim()

    return `You are an upbeat, personal habit coach. Based on this user's habit data, write a short (3-5 sentences), personalized motivational message. Be specific about their actual numbers and streaks. Acknowledge what they did well, gently note any gaps, and give one actionable tip for today. Use a warm, encouraging tone with 1-2 relevant emojis. Do NOT use bullet points — write in flowing prose only.\n\n${context}`
  }

  const getMotivation = async () => {
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          max_tokens: 300,
          messages: [
            {
              role: 'system',
              content: 'You are an upbeat, personal habit coach who gives short personalized motivational messages.',
            },
            {
              role: 'user',
              content: buildPrompt(),
            },
          ],
        }),
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData?.error?.message || 'API error')
      }

      const data = await response.json()
      const text = data.choices?.[0]?.message?.content || 'Keep going — every day counts! 💪'
      setMessage(text)
    } catch (err) {
      setError(err.message || 'Could not connect. Please check your API key.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <button
        onClick={getMotivation}
        disabled={loading}
        style={{
          width: '100%', padding: '14px',
          borderRadius: 'var(--radius)', border: 'none',
          background: loading ? '#a09cf7' : 'linear-gradient(135deg, #6c63ff 0%, #a78bfa 100%)',
          color: '#fff', fontSize: 16, fontWeight: 700,
          cursor: loading ? 'default' : 'pointer',
          boxShadow: '0 4px 14px rgba(108,99,255,0.3)',
          marginBottom: 14, transition: 'opacity 0.2s',
          letterSpacing: '0.2px',
        }}
      >
        {loading ? '⏳ Getting your check-in...' : '✦ Get AI Motivation Check-in'}
      </button>

      {loading && (
        <div style={{
          background: 'var(--surface)', borderRadius: 'var(--radius)',
          border: '1.5px solid var(--accent)', padding: '20px 22px',
        }}>
          <div style={{ color: 'var(--muted)', fontSize: 14 }}>
            ✦ Personalizing your message...
          </div>
        </div>
      )}

      {error && (
        <div style={{
          background: 'var(--danger-light)', borderRadius: 'var(--radius)',
          border: '1.5px solid var(--danger)', padding: '16px 20px',
          color: 'var(--danger)', fontSize: 14,
        }}>
          ⚠️ {error}
        </div>
      )}

      {message && !loading && (
        <div style={{
          background: 'var(--surface)', borderRadius: 'var(--radius)',
          border: '1.5px solid var(--accent)', padding: '20px 22px',
          boxShadow: '0 4px 20px rgba(108,99,255,0.1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'var(--accent)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 18, flexShrink: 0,
            }}>
              ✦
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Your AI Coach</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                Personalized just for you · {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text)' }}>{message}</p>
        </div>
      )}
    </div>
  )
}

export default AICoach