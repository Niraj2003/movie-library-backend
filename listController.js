// listController.js
const List = require('./model/List');

exports.createList = async (req, res) => {
  const { name, movies, isPublic } = req.body;

  try {
    const newList = new List({ name, movies, isPublic, user: req.userId });
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getLists = async (req, res) => {
  try {
    const lists = await List.find({ user: req.userId });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getListById = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    if (list.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateList = async (req, res) => {
  const { name, movies, isPublic } = req.body;

  try {
    let list = await List.findById(req.params.id);

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    if (list.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    list = await List.findByIdAndUpdate(
      req.params.id,
      { name, movies, isPublic },
      { new: true }
    );

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    if (list.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await List.findByIdAndRemove(req.params.id);

    res.json({ message: 'List removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPublicLists = async (req, res) => {
  try {
    const publicLists = await List.find({ isPublic: true });
    res.json(publicLists);
  } catch (error) {
    console.error('Error fetching public lists:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
