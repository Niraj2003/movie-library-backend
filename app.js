const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const listRoutes = require('./routes/listRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

console.log("Client: " + process.env.FRONTEND_URL);

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
}));

console.log("CORS middleware initialized");

app.use(bodyParser.json());

console.log("Body parser middleware initialized");

app.options('*', cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type',
  allowedHeaders: 'Content-Type,Authorization',
}));

console.log("CORS options middleware initialized");

app.get('/', (req, res) => {
  console.log("GET request received on /");
  res.send('API running');
});


app.use('/api/auth', authRoutes);
app.use('/api/lists', listRoutes);

app.get('*',(req,res,next)=>{
  console.log("Invalid request received");
  res.status(200).json({
    message:'bad request'
  });
});

module.exports = app;
