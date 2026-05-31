const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const sessionRoutes = require('./routes/sessionRoutes')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/sessions', sessionRoutes)

app.get('/', (req, res) => res.json({ message: 'StudyMatch API running' }))

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB')
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
    )
  })
  .catch((err) => {
    console.error('❌ MongoDB error:', err.message)
    process.exit(1)
  })
