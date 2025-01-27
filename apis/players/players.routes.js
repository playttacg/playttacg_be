import express from 'express';
import getAllPlayers from './players.controllers.js';  

const router = express.Router();

router.get('/all', getAllPlayers);

export default router;
