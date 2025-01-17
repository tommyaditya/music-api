const axios = require('axios');
const db = require('../models/db');


const searchAndSaveSongs = async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(`${process.env.DEEZER_API_URL}/search`, { params: { q: query } });
    const songs = response.data.data;

    for (const song of songs) {
      const [artist] = await db.execute('INSERT IGNORE INTO artists (name) VALUES (?)', [song.artist.name]);
      const artistId = artist.insertId;

      const [album] = await db.execute('INSERT IGNORE INTO albums (title, artist_id) VALUES (?, ?)', [song.album.title, artistId]);
      const albumId = album.insertId;

      await db.execute('INSERT IGNORE INTO songs (title, album_id) VALUES (?, ?)', [song.title, albumId]);
    }

    res.json({ message: 'Songs saved successfully', songs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching or saving songs', error });
  }
};

module.exports = { searchAndSaveSongs };