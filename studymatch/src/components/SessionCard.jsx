import './SessionCard.css'

const AVATAR_COLORS = [
  '#6C47FF', '#ec4899', '#ef4444', '#f97316',
  '#22c55e', '#14b8a6', '#3b82f6', '#eab308'
]

function Avatar({ initials, colorIndex }) {
  return (
    <div
      className="avatar"
      style={{ backgroundColor: AVATAR_COLORS[colorIndex % AVATAR_COLORS.length] }}
    >
      {initials}
    </div>
  )
}

export default function SessionCard({ session, onJoinToggle }) {
  const {
    id, courseCode, courseColor, title, subject,
    date, time, location, isOnline,
    members, maxMembers, joined, isOwner,
  } = session

  const progress = members / maxMembers

  return (
    <div className="session-card">

      <div className="card-header">
        <div className="card-tags">
          <span
            className="course-tag"
            style={{ color: courseColor, backgroundColor: courseColor + '18' }}
          >
            {courseCode}
          </span>
          {isOwner && <span className="owner-tag">Your post</span>}
        </div>

        {joined ? (
          <button className="btn-joined" onClick={() => onJoinToggle(id)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Joined
          </button>
        ) : (
          <button className="btn-join" onClick={() => onJoinToggle(id)}>
            Join
          </button>
        )}
      </div>

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-subject">{subject}</p>

        <div className="card-meta">
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

      <div className="card-footer">
        <div className="avatars-row">
          {session.memberAvatars.slice(0, 4).map((m, i) => (
            <Avatar key={i} initials={m.initials} colorIndex={m.colorIndex} />
          ))}
          {session.memberAvatars.length > 4 && (
            <div className="avatar avatar-overflow">+{session.memberAvatars.length - 4}</div>
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
