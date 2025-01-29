import eventCollections from './events.models.js';

export const getAllEvents = async (req, res) => {
    try {
        const allEvents = await eventCollections.find({});

        if (allEvents.length === 0) {
            return res.status(404).json({ message: 'No events found' });
        }

        res.status(200).json(allEvents);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('Error fetching events');
    }
};

export const getRecentEvents = async (req, res) => {
    try {
        const recentEvents = await eventCollections.find({})
            .sort({ date: -1 })
            .limit(10);

        if (recentEvents.length === 0) {
            return res.status(404).json({ message: 'No recent events found' });
        }

        return res.status(200).json({ recentEvents });
    } catch (error) {
        console.error('Error fetching recent events:', error);
        return res.status(500).json({ message: 'Error fetching recent events', error: error.message });
    }
};

export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;  // Extract event ID from the URL parameters
        
        const event = await eventCollections.findById(id);  // Find event by ID

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);  // Send the found event as the response
    } catch (error) {
        console.error('Error fetching event by ID:', error);
        res.status(500).json({ message: 'Error fetching event', error: error.message });
    }
};
