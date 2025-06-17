import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { isArrayEmpty } from '../../utils/commonUtils.js';
import newsCollection from './news.models.js';
import { s3 } from '../../config/configWasabi.js';

// ✅ GET ALL NEWS (with signed image URLs)
export const getAllNews = async (req, res) => {
  try {
    const allNews = await newsCollection.find({});

    const newsWithSignedUrls = await Promise.all(
      allNews.map(async (newsItem) => {
        const signedUrl = await getSignedUrl(
          s3,
          new GetObjectCommand({
            Bucket: process.env.WASABI_BUCKET,
            Key: newsItem.imageUrl,
            ResponseContentDisposition: 'inline',
          }),
          { expiresIn: 60 * 60 * 24 * 7 } // 7 days
        );

        return {
          ...newsItem.toObject(),
          imageUrl: signedUrl,
        };
      })
    );

    return res.status(200).json({
      data: newsWithSignedUrls,
      success: true,
      message: isArrayEmpty(newsWithSignedUrls) ? 'No news found' : '',
      errorMsg: '',
      total: newsWithSignedUrls.length,
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return res.status(500).json({ message: 'Error fetching news', error: error.message });
  }
};

// ✅ GET RECENT NEWS (all, sorted)
export const getRecentNews = async (req, res) => {
  try {
    const recentNews = await newsCollection.find({}).sort({ createdAt: -1 });

    if (recentNews.length === 0) {
      return res.status(404).json({ message: 'No news found' });
    }

    return res.status(200).json({ data: recentNews, success: true });
  } catch (error) {
    console.error('Error fetching recent news:', error);
    return res.status(500).json({ message: 'Error fetching news', error: error.message });
  }
};

// ✅ GET K RECENT NEWS
export const getKRecentNews = async (req, res) => {
  try {
    const { count = '4' } = req.query;
    const kRecentNews = await newsCollection.find({}).sort({ createdAt: -1 }).limit(parseInt(count));

    if (kRecentNews.length === 0) {
      return res.status(404).json({ message: 'No news found' });
    }

    return res.status(200).json({ data: kRecentNews, success: true });
  } catch (error) {
    console.error('Error fetching k recent news:', error);
    return res.status(500).json({ message: 'Error fetching news', error: error.message });
  }
};

// ✅ GET NEWS BY ID (with signed image URL)
export const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const newsItem = await newsCollection.findById(id);

    if (!newsItem) {
      return res.status(404).json({ message: 'News not found' });
    }

    const signedUrl = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: process.env.WASABI_BUCKET,
        Key: newsItem.imageUrl,
        ResponseContentDisposition: 'inline',
      }),
      { expiresIn: 60 * 60 * 24 * 7 }
    );

    return res.status(200).json({
      data: {
        ...newsItem.toObject(),
        imageUrl: signedUrl,
      },
      success: true,
    });
  } catch (error) {
    console.error('Error fetching news by ID:', error);
    return res.status(500).json({ message: 'Error fetching news', error: error.message });
  }
};

// ✅ CREATE NEWS
export const createNews = async (req, res) => {
  try {
    const image = req.file;
    const { title, content, category } = req.body;

    if (!title || !content || !category || !image) {
      return res.status(400).json({ message: 'All fields (title, content, category, image) are required.' });
    }

    const key = `news/${Date.now()}_${image.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.WASABI_BUCKET,
        Key: key,
        Body: image.buffer,
        ContentType: image.mimetype,
      })
    );

    const newNews = new newsCollection({
      title: title.trim(),
      content: content.trim(),
      category: category.trim(),
      imageUrl: key, // store only the key
    });

    await newNews.save();

    return res.status(201).json({ message: 'News created successfully', news: newNews });
  } catch (error) {
    console.error('Error creating news:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
