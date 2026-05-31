const BASE = 'https://studymatch-nrr1.onrender.com/api/sessions'

export async function fetchSessions(search = '') {
  const params = search ? `?search=${encodeURIComponent(search)}` : ''
  const res = await fetch(`${BASE}${params}`)
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d.data
}

export async function fetchSessionById(id) {
  const res = await fetch(`${BASE}/${id}`)
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d.data
}

export async function createSession(body) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d.data
}

export async function updateSession(id, body) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d.data
}

export async function deleteSession(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d
}

export async function joinSession(id, initials, colorIndex) {
  const res = await fetch(`${BASE}/${id}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initials, colorIndex }),
  })
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d.data
}

export async function leaveSession(id, initials) {
  const res = await fetch(`${BASE}/${id}/leave`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ initials }),
  })
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d.data
}

export async function fetchStats() {
  const res = await fetch(`${BASE}/stats`)
  const d = await res.json()
  if (!d.success) throw new Error(d.message)
  return d.data
}
