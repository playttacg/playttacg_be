import mongoose from 'mongoose';

// Define the schema for a Table Tennis Player
const playerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
    },
    ranking: {
        type: Number,
        required: true,
        min: 1,  // Best ranking is 1
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    hand: {
        type: String,
        enum: ['left', 'right'],  // To denote whether the player is left or right-handed
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    profilePicture: {
        type: String,  // URL to the profile picture
        trim: true
    },
    tournamentsPlayed: {
        type: Number,
        default: 0
    },
    totalWins: {
        type: Number,
        default: 0
    },
    totalLosses: {
        type: Number,
        default: 0
    }
}, { timestamps: true });  // Ensures automatic creation and update timestamps

// Create and export the model
const PlayerCollections = mongoose.model('Player', playerSchema);

export default PlayerCollections;
