import { isArrayEmpty } from '../../utils/commonUtils.js';
import newsCollection from './news.models.js';

const getAllNews = async (req, res) => {
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

export default getAllNews;
