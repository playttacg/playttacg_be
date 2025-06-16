import express from 'express';
import {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  getTopRankingPlayers,
} from './players.controllers.js';
import { upload } from '../../config/multerConfig.js';

const router = express.Router();

// Define specific routes first
router.get('/top', getTopRankingPlayers);
router.get('/all', getAllPlayers);
router.post('/create', upload.single('playerProfilePic'), createPlayer);
router.get('/:id', getPlayerById); // Generic param route last

export default router;
