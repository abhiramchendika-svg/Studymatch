import './DocsPage.css'

const DOCS = [
  { icon: '🔍', title: 'Browse Sessions', desc: 'Search open study sessions by course code, subject, or topic.' },
  { icon: '➕', title: 'Post a Session', desc: 'Create your own session, set a location or Zoom link, and invite others.' },
  { icon: '✅', title: 'Join a Session', desc: 'Tap Join on any open session to reserve your spot instantly.' },
  { icon: '📅', title: 'My Sessions', desc: 'View all sessions you have joined or hosted in one place.' },
]

export default function DocsPage() {
  return (
    <div className="docs-page">
      <div className="docs-header">
        <h1 className="docs-title">Docs</h1>
        <p className="docs-subtitle">How to use StudyMatch</p>
      </div>
      <div className="docs-grid">
        {DOCS.map((item, i) => (
          <div key={i} className="docs-card">
            <div className="docs-card-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
