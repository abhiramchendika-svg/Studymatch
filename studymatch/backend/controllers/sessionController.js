const Session = require('../models/Session')

// GET all sessions (with optional search filter)
const getAllSessions = async (req, res) => {
  try {
    const { search } = req.query
    const filter = {}
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { courseCode: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
      ]
    }
    const sessions = await Session.find(filter).sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: sessions.length, data: sessions })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// GET single session
const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' })
    res.status(200).json({ success: true, data: session })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// CREATE session
const createSession = async (req, res) => {
  try {
    // Auto-generate courseColor based on subject if not provided
    const COLORS = ['#6C47FF', '#3b82f6', '#22c55e', '#f97316', '#ec4899', '#14b8a6', '#eab308', '#ef4444']
    if (!req.body.courseColor) {
      req.body.courseColor = COLORS[Math.floor(Math.random() * COLORS.length)]
    }

    // Add owner as first member avatar
    const ownerInitials = req.body.ownerInitials || 'AK'
    req.body.memberAvatars = [{ initials: ownerInitials, colorIndex: 0 }]
    req.body.members = 1
    req.body.isOwner = true
    req.body.joinedBy = [ownerInitials]

    const session = await Session.create(req.body)
    res.status(201).json({ success: true, data: session })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const msgs = Object.values(err.errors).map(e => e.message)
      return res.status(400).json({ success: false, message: msgs.join(', ') })
    }
    res.status(500).json({ success: false, message: err.message })
  }
}

// UPDATE session
const updateSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    })
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' })
    res.status(200).json({ success: true, data: session })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// DELETE session
const deleteSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id)
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' })
    res.status(200).json({ success: true, message: 'Session deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// JOIN session
const joinSession = async (req, res) => {
  try {
    const { initials, colorIndex } = req.body
    const session = await Session.findById(req.params.id)
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' })
    if (session.members >= session.maxMembers)
      return res.status(400).json({ success: false, message: 'Session is full' })
    if (session.joinedBy.includes(initials))
      return res.status(400).json({ success: false, message: 'Already joined' })

    session.joinedBy.push(initials)
    session.memberAvatars.push({ initials, colorIndex: colorIndex || 0 })
    session.members += 1
    await session.save()
    res.status(200).json({ success: true, data: session })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// LEAVE session
const leaveSession = async (req, res) => {
  try {
    const { initials } = req.body
    const session = await Session.findById(req.params.id)
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' })

    session.joinedBy = session.joinedBy.filter(i => i !== initials)
    session.memberAvatars = session.memberAvatars.filter(a => a.initials !== initials)
    session.members = Math.max(0, session.members - 1)
    await session.save()
    res.status(200).json({ success: true, data: session })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// GET stats
const getStats = async (req, res) => {
  try {
    const total = await Session.countDocuments()
    const open = await Session.countDocuments({ $expr: { $lt: ['$members', '$maxMembers'] } })
    res.status(200).json({ success: true, data: { total, open } })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { getAllSessions, getSessionById, createSession, updateSession, deleteSession, joinSession, leaveSession, getStats }
