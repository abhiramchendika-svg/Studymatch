const mongoose = require('mongoose')

const memberAvatarSchema = new mongoose.Schema({
  initials: { type: String, required: true },
  colorIndex: { type: Number, default: 0 },
})

const sessionSchema = new mongoose.Schema(
  {
    courseCode: { type: String, required: [true, 'Course code is required'], trim: true },
    courseColor: { type: String, default: '#6C47FF' },
    title: { type: String, required: [true, 'Title is required'], trim: true },
    subject: { type: String, default: '', trim: true },
    date: { type: String, default: '' },
    time: { type: String, default: '' },
    location: { type: String, default: '' },
    isOnline: { type: Boolean, default: false },
    members: { type: Number, default: 1 },
    maxMembers: { type: Number, default: 5 },
    isOwner: { type: Boolean, default: false },
    ownerName: { type: String, default: 'Alex Kim' },
    ownerInitials: { type: String, default: 'AK' },
    joinedBy: { type: [String], default: [] }, // list of user initials who joined
    memberAvatars: { type: [memberAvatarSchema], default: [] },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Session', sessionSchema)
