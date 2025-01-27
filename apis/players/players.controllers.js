import PlayerCollections from './players.models.js';  // Correct import for your model

// Controller to get all players
const getAllPlayers = async (req, res) => {
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

export default getAllPlayers;
