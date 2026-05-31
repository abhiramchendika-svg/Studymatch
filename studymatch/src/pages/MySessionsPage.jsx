import { useState, useEffect } from 'react'
import { fetchSessions, leaveSession, deleteSession } from '../api/sessions'
import './MySessionsPage.css'

const CURRENT_USER = 'AK'

const AVATAR_COLORS = [
  '#6C47FF', '#ec4899', '#ef4444', '#f97316',
  '#22c55e', '#14b8a6', '#3b82f6', '#eab308'
]

function Avatar({ initials, colorIndex }) {
  return (
    <div className="avatar" style={{ backgroundColor: AVATAR_COLORS[colorIndex % AVATAR_COLORS.length] }}>
      {initials}
    </div>
  )
}

function SessionCard({ session, isOwner, onLeave, onDelete }) {
  const { courseCode, courseColor, title, subject, date, time, location, isOnline, members, maxMembers, memberAvatars } = session
  const progress = members / maxMembers

  return (
    <div className="ms-card">
      <div className="ms-card-header">
        <div className="ms-card-tags">
          <span className="ms-course-tag" style={{ color: courseColor, backgroundColor: courseColor + '18' }}>
            {courseCode}
          </span>
          {isOwner && <span className="owner-tag">Your post</span>}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {isOwner && (
            <button
              className="btn-joined"
              style={{ color: '#ef4444', borderColor: '#fecaca', background: '#fef2f2' }}
              onClick={() => onDelete(session.id)}
            >
              Delete
            </button>
          )}
          <button className="btn-joined" onClick={() => onLeave(session.id)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Joined
          </button>
        </div>
      </div>

      <div className="ms-card-body">
        <h3 className="ms-card-title">{title}</h3>
        <p className="ms-card-subject">{subject}</p>
        <div className="ms-card-meta">
          <span className="meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            {date}
          </span>
          <span className="meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            {time}
          </span>
          <span className="meta-item">
            {isOnline ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="7" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                <circle cx="12" cy="13" r="1.5" fill="currentColor"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.8"/>
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
              </svg>
            )}
            {location}
          </span>
        </div>
      </div>

      <div className="ms-card-footer">
        <div className="avatars-row">
          {(memberAvatars || []).slice(0, 4).map((m, i) => (
            <Avatar key={i} initials={m.initials} colorIndex={m.colorIndex} />
          ))}
          {(memberAvatars || []).length > 4 && (
            <div className="avatar avatar-overflow">+{memberAvatars.length - 4}</div>
          )}
        </div>
        <div className="capacity-wrap">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
          </div>
          <span className="capacity-text">{members}/{maxMembers}</span>
        </div>
      </div>
    </div>
  )
}

export default function MySessionsPage({ setActivePage }) {
  const [posted, setPosted] = useState([])
  const [joined, setJoined] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const all = await fetchSessions()
      const mapped = all.map(s => ({ ...s, id: s._id }))
      setPosted(mapped.filter(s => s.ownerInitials === CURRENT_USER))
      setJoined(mapped.filter(s => s.joinedBy?.includes(CURRENT_USER) && s.ownerInitials !== CURRENT_USER))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleLeave = async (id) => {
    try {
      await leaveSession(id, CURRENT_USER)
      load()
    } catch (e) { console.error(e) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this session?')) return
    try {
      await deleteSession(id)
      load()
    } catch (e) { console.error(e) }
  }

  if (loading) return (
    <div className="mysessions-page">
      <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>Loading your sessions...</div>
    </div>
  )

  return (
    <div className="mysessions-page">

      <div className="mysessions-header">
        <div className="mysessions-header-left">
          <h1 className="mysessions-title">My Sessions</h1>
          <p className="mysessions-subtitle">Sessions you posted and joined</p>
        </div>
        <div className="mysessions-header-right">
          <div className="user-avatar">AK</div>
          <span className="user-name">Alex Kim</span>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <span className="section-label">YOU POSTED ({posted.length})</span>
          <button className="new-session-btn" onClick={() => setActivePage('post')}>
            + New Session
          </button>
        </div>
        <div className="section-cards">
          {posted.length === 0 ? (
            <p style={{ fontSize: '14px', color: '#94a3b8', padding: '12px 0' }}>No sessions posted yet.</p>
          ) : posted.map(s => (
            <SessionCard key={s.id} session={s} isOwner={true} onLeave={handleLeave} onDelete={handleDelete} />
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <span className="section-label">YOU JOINED ({joined.length})</span>
        </div>
        <div className="section-cards">
          {joined.length === 0 ? (
            <p style={{ fontSize: '14px', color: '#94a3b8', padding: '12px 0' }}>No sessions joined yet.</p>
          ) : joined.map(s => (
            <SessionCard key={s.id} session={s} isOwner={false} onLeave={handleLeave} onDelete={handleDelete} />
          ))}
        </div>
      </div>

    </div>
  )
}
