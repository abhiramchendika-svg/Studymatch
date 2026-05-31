const express = require('express')
const router = express.Router()
const {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
  joinSession,
  leaveSession,
  getStats,
} = require('../controllers/sessionController')

router.get('/stats', getStats)           // GET    /api/sessions/stats
router.get('/', getAllSessions)           // GET    /api/sessions
router.get('/:id', getSessionById)       // GET    /api/sessions/:id
router.post('/', createSession)          // POST   /api/sessions
router.put('/:id', updateSession)        // PUT    /api/sessions/:id
router.delete('/:id', deleteSession)     // DELETE /api/sessions/:id
router.post('/:id/join', joinSession)    // POST   /api/sessions/:id/join
router.post('/:id/leave', leaveSession)  // POST   /api/sessions/:id/leave

module.exports = router
