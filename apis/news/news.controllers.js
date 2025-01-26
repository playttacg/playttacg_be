import newsCollection from './news.models.js';

const getAllNews = async () => {
    try {
        const allNews = await newsCollection.find({});
        return allNews; // Make sure to return the result
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error; // Re-throw the error so it can be handled by the caller
    }
};

export default getAllNews;
