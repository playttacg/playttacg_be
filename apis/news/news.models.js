import mongoose from "mongoose";

const newsCollection = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    author: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    tags: {
        type: [String],
        required: true,
    },
    publishedDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const News = mongoose.model("News", newsCollection);

export default News;
