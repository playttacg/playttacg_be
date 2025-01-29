import PlayerCollections from './players.models.js';  // Correct import for your model

// Controller to get all players
export const getAllPlayers = async (req, res) => {
    try {
        // Fetch all players from the database
        const players = await PlayerCollections.find({});
        
        // If there are no players in the database
        if (players.length === 0) {
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
    const topPlayers = await PlayerCollections.find()
      .sort({ ranking: 1 }) 
      .limit(10) 
      .exec();

    // Check if any players are found
    if (!topPlayers || topPlayers.length === 0) {
      return res.status(404).json({ message: 'No players found.' });
    }

    // Return the top 10 players
    res.status(200).json(topPlayers);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching top 10 players.',
      details: error.message,
    });
  }
};






  
