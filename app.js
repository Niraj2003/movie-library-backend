const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'https://movie-library-sooty.vercel.app/',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('API running');
})

const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const listRoutes = require('./routes/listRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/lists', listRoutes);

app.get('*',(req,res,next)=>{
  res.status(200).json({
    message:'bad request'
  })
})

module.exports = app;