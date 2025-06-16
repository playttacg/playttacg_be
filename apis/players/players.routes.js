import express from 'express';
import { createPlayer, getAllPlayers, getPlayerById, getTopRankingPlayers } from './players.controllers.js';

const router = express.Router();

// Define specific routes first
router.get('/top', getTopRankingPlayers);
router.get('/all', getAllPlayers);
router.post('/create',createPlayer);
router.get('/:id', getPlayerById); // Place this last to avoid conflicts

export default router;
