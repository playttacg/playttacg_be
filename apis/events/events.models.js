import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    registrationLink: {
        type: String,
        required: true
    },
    isRegistrationOpen: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        required: true
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;