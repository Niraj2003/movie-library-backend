const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

console.log("Client" + process.env.FRONTEND_URL);

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
}));
app.use(bodyParser.json());

app.options('*', cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type',
  allowedHeaders: 'Content-Type,Authorization',
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
