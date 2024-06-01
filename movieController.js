// movieController.js
const axios = require('axios');

exports.searchMovies = async (req, res) => {
  console.log("search movies");
  const { query } = req.query;
  console.log(query);
  try {
    console.log(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`);
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`);
    console.log(typeof(response.data));
    res.status(200).json({ message: 'Movies found', data: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
