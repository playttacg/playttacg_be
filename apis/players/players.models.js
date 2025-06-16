import mongoose from 'mongoose';

// Define the schema for a Table Tennis Player
const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate emails
    lowercase: true,
    trim: true
  },
  ranking: {
    type: Number,
    min: 1 // World ranking cannot be less than 1
  },
  district: {
    type: String,
    required: true,
    trim: true
  },
  hand: {
    type: String,
    enum: ['left', 'right'],
    required: true,
    lowercase: true
  },
  adhaarProof: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  profilePicture: {
    type: String,
    trim: true // Assume it's a URL or file path
  },
  tournamentsPlayed: {
    type: Number,
    default: 0,
    min: 0
  },
  totalWins: {
    type: Number,
    default: 0,
    min: 0
  },
  totalLosses: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Create and export the model
const PlayerCollections = mongoose.model('Player', playerSchema);
export default PlayerCollections;
