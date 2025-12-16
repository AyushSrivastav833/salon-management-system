const bcrypt = require("bcryptjs")

const mongoose = require("mongoose")
const { Schema, model } = mongoose

const BarberSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  shopName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  specialties: {
    type: [String],
    default: []
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: "https://placehold.co/300x300?text=Barber"
  },
  rating: {
    type: Number,
    default: 4.5
  },
  reviews: {
    type: Number,
    default: 50
  }
})

const BarberModel = model("Barber", BarberSchema)

module.exports = BarberModel
