import eventCollections from './events.models.js';

const getAllEvents = async (req, res) => {
    try {
        const allEvents = await eventCollections.find({});
        
        res.status(200).json(allEvents);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('Error fetching events');
    }
};

export default getAllEvents;
