import { isArrayEmpty } from '../../utils/commonUtils.js';
import PlayerCollections from './players.models.js';  // Correct import for your model
import { chhattisgarhDistricts } from '../../utils/cgDistrictData.js';

// Controller to get all players
export const getAllPlayers = async (req, res) => {
    try {
        // Fetch all players from the database
        const players = await PlayerCollections.find({});
        
        // If there are no players in the database
        if (isArrayEmpty(players)) {
            return res.status(404).json({ message: 'No players found' });
        }

        // Respond with the list of players
        res.status(200).json(players);
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ message: 'Error fetching players', error: error.message });
    }
};

export const getPlayerById = async (req, res) => {
  try {
    const playerId = req.params.id;

    const player = await PlayerCollections.findById(playerId);  // <-- Fix here

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    return res.status(200).json({ player });
  } catch (error) {
    console.error('Error fetching player:', error);
    return res.status(500).json({ message: 'Error fetching player', error: error.message });
  }
};


// Function to get top ranking players
export const getTopRankingPlayers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 

    const skip = (page - 1) * limit;

    const topPlayers = await PlayerCollections.find()
      .sort({ ranking: 1 }) // Sort by ranking (ascending)
      .skip(skip) // Skip players from previous pages
      .limit(limit) // Limit the number of players per page
      .exec();

    const totalPlayers = await PlayerCollections.countDocuments();

    // Return paginated response
    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalPlayers / limit), 
      totalPlayers, 
      players: topPlayers, 
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching players with pagination.',
      details: error.message,
    });
  }
};

export const createPlayer = async (req, res) => {
  try {
    const { name, email, district, hand, adhaarProof, dateOfBirth, profilePicture } = req.body;

    // Validate required fields
    if (!name || !email || !district || !hand || !adhaarProof || !dateOfBirth || !profilePicture) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the player already exists
    const existingPlayer = await PlayerCollections.findOne({ email });
    if (existingPlayer) {
      return res.status(409).json({ error: 'Email already exists or user already registered' });
    }
    // Create new player
    const newPlayer = new PlayerCollections({
      name,
      email,
      district,
      hand,
      adhaarProof,
      dateOfBirth,
      profilePicture,
    });

    await newPlayer.save();

    res.status(201).json({ message: 'Player created successfully', player: newPlayer });
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
}; 





  
