const List = require('./model/List');

exports.createList = async (req, res) => {
  const { name, movies, isPublic } = req.body;
  try {
    console.log('Creating list:');
    // console.log(name, movies, isPublic, req.userId);
    const newList = new List({ name, movies, isPublic, user: req.userId });
    await newList.save();
    console.log('New list created:');
    // console.log(newList);
    res.status(201).json(newList);
  } catch (error) {
    console.error('Error creating list:', error); 
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLists = async (req, res) => {
  try {
    const lists = await List.find({ user: req.userId });
    console.log('Lists retrieved:')
    // console.log(lists); 
    res.json(lists);
  } catch (error) {
    console.error('Error retrieving lists:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPublicLists = async (req, res) => {
  console.log('Retrieving public lists');
  try {
    const lists = await List.find({ isPublic: true });
    console.log('Public lists retrieved:');
    // console.log(lists);
    res.json(lists);
  } catch (error) {
    console.error('Error retrieving public lists:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
