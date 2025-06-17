import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { isArrayEmpty } from '../../utils/commonUtils.js';
import PlayerCollections from './players.models.js';
// import { chhattisgarhDistricts } from '../../utils/cgDistrictData.js';
import { s3 } from '../../config/configWasabi.js';

// Get all players
export const getAllPlayers = async (req, res) => {
  try {
    const players = await PlayerCollections.find({});
    if (isArrayEmpty(players)) {
      return res.status(404).json({ message: 'No players found' });
    }
    res.status(200).json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ message: 'Error fetching players', error: error.message });
  }
};

// Get player by ID
export const getPlayerById = async (req, res) => {
  try {
    const playerId = req.params.id;
    const player = await PlayerCollections.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.status(200).json({ player });
  } catch (error) {
    console.error('Error fetching player:', error);
    res.status(500).json({ message: 'Error fetching player', error: error.message });
  }
};

// Get top ranking players with pagination
export const getTopRankingPlayers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const topPlayers = await PlayerCollections.find()
      .sort({ ranking: 1 })
      .skip(skip)
      .limit(limit);

    const totalPlayers = await PlayerCollections.countDocuments();

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalPlayers / limit),
      totalPlayers,
      players: topPlayers,
    });
  } catch (error) {
    console.error('Error fetching top players:', error);
    res.status(500).json({ message: 'Error fetching top players', error: error.message });
  }
};

// Create a new player
export const createPlayer = async (req, res) => {
  try {
    const profilePicture = req.file;
    const { name, email, district, hand, adhaarProof, dateOfBirth } = req.body;

    // Validate required fields
    if (!profilePicture || !name || !email || !district || !hand || !adhaarProof || !dateOfBirth) {
      return res.status(400).json({ error: 'All fields are required including profile picture' });
    }

    // Check for existing player
    const existingPlayer = await PlayerCollections.findOne({ email: email.trim().toLowerCase() });
    if (existingPlayer) {
      return res.status(409).json({ error: 'Email already exists or user already registered' });
    }

    // Use original file name only (no prefix)
    const key = `players/${profilePicture.originalname}`;

    // Upload to Wasabi
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.WASABI_BUCKET,
        Key: key,
        Body: profilePicture.buffer,
        ContentType: profilePicture.mimetype,
      })
    );

    // Generate presigned URL (7 days)
  const signedUrl = await getSignedUrl(
  s3,
  new GetObjectCommand({
    Bucket: process.env.WASABI_BUCKET,
    Key: key,
    ResponseContentDisposition: 'inline', // 👈 Important line
  }),
  { expiresIn: 60 * 60 * 24 * 7 } // 7 days
);


    // Save player to DB
    const newPlayer = new PlayerCollections({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      district: district.trim(),
      hand: hand.trim().toLowerCase(),
      adhaarProof: adhaarProof.trim(),
      dateOfBirth,
      profilePicture: signedUrl,
    });

    await newPlayer.save();
    res.status(201).json({ message: 'Player created successfully', player: newPlayer });
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({ error: 'Server error. Please try again later.', details: error.message });
  }
};


export const updatePlayer = async (req, res) => { 

  try {
    const playerId = req.params.id;
    const { name, email, district, hand, adhaarProof, dateOfBirth } = req.body;

    // Validate required fields
    if (!name || !email || !district || !hand || !adhaarProof || !dateOfBirth) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Find player by ID
    const player = await PlayerCollections.findById(playerId);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    // Update player details
    player.name = name.trim();
    player.email = email.trim().toLowerCase();
    player.district = district.trim();
    player.hand = hand.trim().toLowerCase();
    player.adhaarProof = adhaarProof.trim();
    player.dateOfBirth = dateOfBirth;

    // Save updated player
    await player.save();
    res.status(200).json({ message: 'Player updated successfully', player });
  } catch (error) {
    console.error('Error updating player:', error);
    res.status(500).json({ error: 'Server error. Please try again later.', details: error.message });
  }
}