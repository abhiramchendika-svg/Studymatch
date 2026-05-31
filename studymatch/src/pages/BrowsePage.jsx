import { useState, useEffect } from 'react'
import SessionCard from '../components/SessionCard'
import { fetchSessions, joinSession, leaveSession } from '../api/sessions'
import './BrowsePage.css'

const CURRENT_USER = 'AK'
const CURRENT_USER_COLOR = 0

export default function BrowsePage() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  const load = async (searchVal = '') => {
    try {
      const data = await fetchSessions(searchVal)
      // Map MongoDB _id to id and compute joined state for current user
      const mapped = data.map(s => ({
        ...s,
        id: s._id,
        joined: s.joinedBy?.includes(CURRENT_USER) || false,
      }))
      setSessions(mapped)
      setError('')
    } catch (e) {
      setError('Could not connect to server. Make sure backend is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => load(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  const handleJoinToggle = async (id) => {
    const session = sessions.find(s => s.id === id)
    if (!session) return
    try {
      if (session.joined) {
        const updated = await leaveSession(id, CURRENT_USER)
        setSessions(prev => prev.map(s =>
          s.id === id ? { ...updated, id: updated._id, joined: false } : s
        ))
      } else {
        if (session.members >= session.maxMembers) return
        const updated = await joinSession(id, CURRENT_USER, CURRENT_USER_COLOR)
        setSessions(prev => prev.map(s =>
          s.id === id ? { ...updated, id: updated._id, joined: true } : s
        ))
      }
    } catch (e) {
      console.error(e)
    }
  }

  const openCount = sessions.filter(s => s.members < s.maxMembers).length

  return (
    <div className="browse-page">
      <div className="browse-header">
        <h1 className="browse-title">Find Study Partners</h1>
        <p className="browse-subtitle">{openCount} open sessions across campus</p>
      </div>

      <div className="search-wrap">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          className="search-input"
          type="text"
          placeholder="Search by course or topic..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch('')}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>

      {error && (
        <div style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '12px', padding: '14px 18px', fontSize: '14px' }}>
          ⚠️ {error}
        </div>
      )}

      <div className="sessions-list">
        {loading ? (
          <div className="empty-state"><p>Loading sessions...</p></div>
        ) : sessions.length === 0 ? (
          <div className="empty-state">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p>{search ? <>No sessions found for <strong>{search}</strong></> : 'No sessions yet. Be the first to post one!'}</p>
          </div>
        ) : (
          sessions.map(session => (
            <SessionCard key={session.id} session={session} onJoinToggle={handleJoinToggle} />
          ))
        )}
      </div>
    </div>
  )
}
