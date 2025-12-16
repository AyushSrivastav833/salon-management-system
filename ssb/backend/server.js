const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const http = require("http")
const { Server } = require("socket.io")
const Barber = require("./models/barber")
const Appointment = require("./models/appointment")

const app = express()
const server = http.createServer(app)

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
})

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully")

    const PORT = process.env.PORT || 4000
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err)
    process.exit(1)
  })

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id)

  socket.on("join", (data) => {
    if (data.type === "user" && data.email) {
      socket.join(`user:${data.email}`)
    } else if (data.type === "barber" && data.name) {
      socket.join(`barber:${data.name}`)
    }
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })
})

// -------- ROUTES (UNCHANGED LOGIC) --------

// Create barber
app.post("/create-account", async (req, res) => {
  try {
    const { password, ...rest } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const barber = await Barber.create({
      ...rest,
      password: hashedPassword,
    })

    res.json({ message: "Barber created successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// Barber login
app.post("/barber-login", async (req, res) => {
  try {
    const { barbername, password } = req.body

    const barber = await Barber.findOne({
      $or: [
        { firstName: barbername },
        { lastName: barbername },
        { email: barbername },
      ],
    })

    if (!barber) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, barber.password)

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: barber._id, email: barber.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({
      token,
      barber: {
        id: barber._id,
        name: barber.firstName,
        email: barber.email,
      },
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// Get all barbers
app.get("/barbers", async (req, res) => {
  const barbers = await Barber.find({}, { password: 0 })
  res.json(barbers)
})

// Create appointment
app.post("/appointments", async (req, res) => {
  const appointment = await Appointment.create(req.body)
  io.to(`barber:${req.body.barber}`).emit("new_appointment", appointment)
  res.status(201).json(appointment)
})

// Get barber appointments
app.get("/barber-appointments/:barber", async (req, res) => {
  const apps = await Appointment.find({ barber: req.params.barber })
  res.json(apps)
})

// Get user appointments
app.get("/user-appointments/:email", async (req, res) => {
  const apps = await Appointment.find({ email: req.params.email })
  res.json(apps)
})
// Cancel appointment by user
app.delete("/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params

    const appointment = await Appointment.findByIdAndDelete(id)

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" })
    }

    // Notify barber in real-time (optional but impressive)
    io.to(`barber:${appointment.barber}`).emit("appointment_cancelled", {
      id: appointment._id,
      email: appointment.email,
    })

    res.json({ message: "Appointment cancelled successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
