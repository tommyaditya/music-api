const db = require('../models/db');

const getSongs = async (req, res) => {
  try {
    const [songs] = await db.execute('SELECT songs.id, songs.title, albums.title AS album, artists.name AS artist FROM songs JOIN albums ON songs.album_id = albums.id JOIN artists ON albums.artist_id = artists.id');
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs', error });
  }
};

const addSong = async (req, res) => {
  const { title, album_id } = req.body;
  try {
    await db.execute('INSERT INTO songs (title, album_id) VALUES (?, ?)', [title, album_id]);
    res.status(201).json({ message: 'Song added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding song', error });
  }
};

module.exports = { getSongs, addSong };