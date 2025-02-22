import { isArrayEmpty } from '../../utils/commonUtils.js';
import newsCollection from './news.models.js';

export  const getAllNews = async (req, res) => {
    try {
        const allNews = await newsCollection.find({});

        const responseObject = {
            data: allNews,
            success:true,
            message: isArrayEmpty(allNews) ? 'No news found' : '',
            errorMsg:'',
            total: allNews.length
        }

        return res.status(200).json(responseObject);
    } catch (error) {
        console.error('Error fetching news:', error);
        return res.status(500).json({ message: 'Error fetching news', error: error.message });
    }
};

export const getRecentNews = async (req, res) => {
    try {
      // Fetch the news sorted by the 'createdAt' field in descending order (most recent first)
      const recentNews = await newsCollection.find({}).sort({ createdAt: -1 });
  
      // If no news is found, return a 404 response
      if (recentNews.length === 0) {
        return res.status(404).json({ message: 'No news found' });
      }
  
      // Return the recent news
      return res.status(200).json({ recentNews });
    } catch (error) {
      console.error('Error fetching news:', error);
      return res.status(500).json({ message: 'Error fetching news', error: error.message });
    }
};

export const getNewsById = async (req, res) => {
  try {
      const { id } = req.params;  
      
      const newsItem = await newsCollection.findById(id);

      // If no news item is found, return a 404 response
      if (!newsItem) {
          return res.status(404).json({ message: 'News not found' });
      }

      return res.status(200).json(newsItem);
  } catch (error) {
      console.error('Error fetching news by ID:', error);
      return res.status(500).json({ message: 'Error fetching news', error: error.message });
  }
};
  
export const getKRecentNews = async (req, res) => {
  try {
    const { count = '4' } = req.query;
    const kRecentNews = await newsCollection.find({}).sort({ createdAt: -1 }).limit(parseInt(count));

    if (kRecentNews.length === 0) {
      return res.status(404).json({ message: 'No news found' });
    }

    return res.status(200).json({ kRecentNews });
  } catch (error) {
    console.error('Error fetching news:', error);
    return res.status(500).json({ message: 'Error fetching news', error: error.message });
  }
};
