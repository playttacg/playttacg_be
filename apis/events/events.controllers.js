import { isArrayEmpty } from '../../utils/commonUtils.js';
import eventCollections from './events.models.js';

export const getAllEvents = async (req, res) => {
    try {
        const allEvents = await eventCollections.find({});

        if (isArrayEmpty(allEvents)) {
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
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const skip = (page - 1) * limit; 

        const recentEvents = await eventCollections.find({})
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);

        // Check if any events are found
        if (recentEvents.length === 0) {
            return res.status(404).json({ message: 'No recent events found' });
        }

        // Get the total count of events for pagination metadata
        const totalEvents = await eventCollections.countDocuments({});
        const totalPages = Math.ceil(totalEvents / limit);

        // Return the paginated events and metadata
        return res.status(200).json({
            recentEvents,
            pagination: {
                totalItems: totalEvents,
                totalPages,
                currentPage: page,
                itemsPerPage: limit,
            },
        });
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
