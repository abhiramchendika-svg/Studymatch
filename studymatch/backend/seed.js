console.log("Seed file started...")

require("dotenv").config()
const mongoose = require("mongoose")
const Session = require("./models/Session")

console.log("MONGO_URI exists:", !!process.env.MONGO_URI)

const sessions = [
  {
    courseCode: "CS101",
    courseColor: "#6C47FF",
    title: "Data Structures Study Group",
    subject: "Computer Science",
    date: "2026-06-05",
    time: "10:00 AM",
    location: "Library Room A",
    isOnline: false,
    members: 3,
    maxMembers: 5,
    isOwner: true,
    ownerName: "Abhiram",
    ownerInitials: "AC",
    joinedBy: ["AC", "SK", "MJ"],
    memberAvatars: [
      { initials: "AC", colorIndex: 0 },
      { initials: "SK", colorIndex: 1 },
      { initials: "MJ", colorIndex: 2 }
    ]
  }
]

const seedDB = async () => {
  try {
    console.log("Connecting to MongoDB...")

    await mongoose.connect(process.env.MONGO_URI)

    console.log("MongoDB connected successfully")
    console.log("Connected DB:", mongoose.connection.name)

    await Session.deleteMany({})
    console.log("Old sessions deleted")

    const data = await Session.insertMany(sessions)
    console.log("Inserted sessions:", data.length)

    process.exit(0)
  } catch (error) {
    console.log("Seeder error:")
    console.error(error)
    process.exit(1)
  }
}

seedDB()