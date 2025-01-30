import express from 'express';
import { getAllPlayers, getPlayerById, getTopRankingPlayers } from './players.controllers.js';

const router = express.Router();

// Define specific routes first
router.get('/top', getTopRankingPlayers);
router.get('/all', getAllPlayers);
router.get('/:id', getPlayerById); // Place this last to avoid conflicts

export default router;
