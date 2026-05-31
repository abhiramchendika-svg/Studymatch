import './Navbar.css'

export default function Navbar({ activePage, setActivePage }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">

        <div className="navbar-logo" onClick={() => setActivePage('browse')}>
          <div className="logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <span className="logo-text">StudyMatch</span>
        </div>

        <div className="navbar-links">
          <button
            className={`nav-link ${activePage === 'browse' ? 'active' : ''}`}
            onClick={() => setActivePage('browse')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Browse
          </button>

          <button
            className={`nav-link ${activePage === 'post' ? 'active' : ''}`}
            onClick={() => setActivePage('post')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Post
          </button>

          <button
            className={`nav-link ${activePage === 'sessions' ? 'active' : ''}`}
            onClick={() => setActivePage('sessions')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
            </svg>
            My Sessions
          </button>

          <button
            className={`nav-link ${activePage === 'docs' ? 'active' : ''}`}
            onClick={() => setActivePage('docs')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Docs
          </button>
        </div>

        <div className="navbar-avatar">AK</div>

      </div>
    </nav>
  )
}
