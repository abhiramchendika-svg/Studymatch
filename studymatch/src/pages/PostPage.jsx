import { useState } from 'react'
import { createSession } from '../api/sessions'
import './PostPage.css'

const COURSE_COLORS = {
  'Computer Science': '#6C47FF',
  'Mathematics': '#3b82f6',
  'Biology': '#22c55e',
  'Physics': '#f97316',
  'Chemistry': '#ec4899',
  'History': '#14b8a6',
  'English': '#eab308',
  'default': '#6C47FF',
}

export default function PostPage() {
  const [form, setForm] = useState({
    courseCode: '',
    courseName: '',
    studyTopic: '',
    date: '',
    time: '',
    locationType: 'inperson',
    location: '',
    maxSize: '5',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const isValid = form.courseCode && form.studyTopic && form.date

  const handleSubmit = async () => {
    if (!isValid) return
    setLoading(true)
    setError('')
    try {
      const courseColor = COURSE_COLORS[form.courseName] || COURSE_COLORS['default']
      await createSession({
        courseCode: form.courseCode,
        courseColor,
        title: form.studyTopic,
        subject: form.courseName,
        date: new Date(form.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        time: form.time ? new Date(`2000-01-01T${form.time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '',
        location: form.location,
        isOnline: form.locationType === 'online',
        maxMembers: parseInt(form.maxSize),
        ownerName: 'Alex Kim',
        ownerInitials: 'AK',
      })
      setSubmitted(true)
    } catch (e) {
      setError(e.message || 'Failed to post session. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="post-page">
        <div className="success-box">
          <div className="success-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>Session Posted!</h2>
          <p>Your study session <strong>{form.studyTopic}</strong> is now live for classmates to find and join.</p>
          <button className="btn-post" onClick={() => {
            setSubmitted(false)
            setForm({ courseCode: '', courseName: '', studyTopic: '', date: '', time: '', locationType: 'inperson', location: '', maxSize: '5' })
          }}>
            Post Another Session
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="post-page">
      <div className="post-header">
        <h1 className="post-title">Post a Study Session</h1>
        <p className="post-subtitle">Fill in the details — classmates can find and join.</p>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '12px', padding: '12px 16px', fontSize: '14px', marginBottom: '8px' }}>
          ⚠️ {error}
        </div>
      )}

      <div className="post-form">

        <div className="form-row-two">
          <div className="form-group">
            <label>Course Code</label>
            <input name="courseCode" placeholder="e.g. CS 301" value={form.courseCode} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Course Name</label>
            <input name="courseName" placeholder="e.g. Computer Science" value={form.courseName} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Study Topic</label>
          <input name="studyTopic" placeholder="e.g. Dynamic Programming Review" value={form.studyTopic} onChange={handleChange} />
        </div>

        <div className="form-row-two">
          <div className="form-group">
            <label>Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input name="time" type="time" value={form.time} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Location Type</label>
          <div className="toggle-group">
            <button
              className={`toggle-btn ${form.locationType === 'inperson' ? 'active' : ''}`}
              onClick={() => setForm(prev => ({ ...prev, locationType: 'inperson' }))}
              type="button"
            >
              📍 In Person
            </button>
            <button
              className={`toggle-btn ${form.locationType === 'online' ? 'active' : ''}`}
              onClick={() => setForm(prev => ({ ...prev, locationType: 'online' }))}
              type="button"
            >
              🖥 Online
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>{form.locationType === 'inperson' ? 'Building & Room' : 'Meeting Link'}</label>
          <input
            name="location"
            placeholder={form.locationType === 'inperson' ? 'e.g. Library Room 204' : 'e.g. Zoom link'}
            value={form.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Max Group Size</label>
          <select name="maxSize" value={form.maxSize} onChange={handleChange}>
            {[2,3,4,5,6,7,8,10,12,15,20].map(n => (
              <option key={n} value={n}>{n} students</option>
            ))}
          </select>
        </div>

        <button
          className={`btn-post ${(!isValid || loading) ? 'disabled' : ''}`}
          onClick={handleSubmit}
          disabled={!isValid || loading}
        >
          {loading ? 'Posting...' : 'Post Session'}
        </button>

      </div>
    </div>
  )
}
