// movieController.js
const axios = require('axios');

exports.searchMovies = async (req, res) => {
  const { query } = req.query;

  try {
    console.log(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`);
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
