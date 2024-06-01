const List = require('./model/List');

// listController.js

exports.createList = async (req, res) => {
  const { name, movies, isPublic } = req.body;
  try {
    console.log('Creating list:', name, movies, isPublic, req.userId); // Add console log here
    const newList = new List({ name, movies, isPublic, user: req.userId });
    await newList.save();
    console.log('New list created:', newList); // Add console log here
    res.status(201).json(newList);
  } catch (error) {
    console.error('Error creating list:', error); // Add console log here
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLists = async (req, res) => {
  try {
    const lists = await List.find({ user: req.userId });
    console.log('Lists retrieved:', lists); // Add console log here
    res.json(lists);
  } catch (error) {
    console.error('Error retrieving lists:', error); // Add console log here
    res.status(500).json({ message: 'Server error' });
  }
};
