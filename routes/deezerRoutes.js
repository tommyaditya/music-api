const express = require('express');
const { searchAndSaveSongs } = require('../controllers/deezerController');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.get('/songs/save', authenticate, searchAndSaveSongs);

module.exports = router;
