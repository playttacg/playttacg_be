import newsCollection from './news.models.js';

const getAllNews = async (req, res) => {
    try {
        const allNews = await newsCollection.find({});

        if (allNews.length === 0) {
            return res.status(404).json({ message: 'No news found' });
        }

        return res.status(200).json(allNews);
    } catch (error) {
        console.error('Error fetching news:', error);
        return res.status(500).json({ message: 'Error fetching news', error: error.message });
    }
};

export default getAllNews;
