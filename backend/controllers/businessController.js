const Business = require('../models/businessModel');
const mongoose = require('mongoose');

// get all of one users businesses
const getBusinesses = async (req, res) => {
  try {
    const user_id = req.user._id;

    const businesses = await Business.find({ user_id }).sort({ createdAt: -1 });

    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a single business
const getBusiness = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such business' });
  }

  const business = await Business.findById(id);

  if (!business) {
    return res.status(404).json({ error: 'No such business' });
  }

  res.status(200).json(business);
};

// create new business
const createBusiness = async (req, res) => {
  const { title, owner, shortDescription } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!owner) {
    emptyFields.push('owner');
  }
  if (!shortDescription) {
    emptyFields.push('shortDescription');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const business = await Business.create({
      title,
      owner,
      shortDescription,
      user_id,
    });
    res.status(200).json(business);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a business
const deleteBusiness = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such business' });
  }

  const business = await Business.findOneAndDelete({ _id: id });

  if (!business) {
    return res.status(400).json({ error: 'No such business' });
  }

  res.status(200).json(business);
};

// update a business
const updateBusiness = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such business' });
  }

  const business = await Business.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!business) {
    return res.status(400).json({ error: 'No such business' });
  }

  res.status(200).json(business);
};

module.exports = {
  getBusinesses,
  getBusiness,
  createBusiness,
  deleteBusiness,
  updateBusiness,
};
