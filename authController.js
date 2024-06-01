// authController.js
const jwt = require('jsonwebtoken');
const User = require('./model/User');
const List = require('./model/List');
const Cookies= require('js-cookie');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  console.log("authController.js");
  console.log(req.body.username);
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(`Email: ${email}, Password: ${password}`);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user._id, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserProfile = async (req, res) => {
  // console.log(req.cookies.authToken);
  try {
    // Retrieve user information from the database based on user ID obtained from JWT token
    const token = req.cookies.authToken;

    // console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const user = await User.findById(userId).select('-password'); // Exclude password from the response
    console.log("Username "+ user.username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Retrieve lists associated with the user
    const lists = await List.find({ user: userId }); // Use userId instead of req.userId
    console.log(lists);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
