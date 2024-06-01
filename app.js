const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const listRoutes = require('./routes/listRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

console.log("Client: " + process.env.FRONTEND_URL);

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

console.log("CORS middleware initialized");

app.use(bodyParser.json());

console.log("Body parser middleware initialized");

app.options('*', cors());

console.log("CORS options middleware initialized");

app.get('/', (req, res) => {
  console.log("GET request received on /");
  res.send('API running');
});

app.use('/api/auth', authRoutes);
app.use('/api/lists', listRoutes);

app.use('*', (req, res, next) => {
  console.log("Invalid request received");
  res.status(400).json({
    message: 'Bad request'
  });
});

module.exports = app;
