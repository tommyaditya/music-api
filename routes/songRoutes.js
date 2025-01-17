const express = require('express');
const { getSongs, addSong } = require('../controllers/songController');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();

router.get('/', authenticate, getSongs);
router.post('/', authenticate, addSong);

module.exports = router;