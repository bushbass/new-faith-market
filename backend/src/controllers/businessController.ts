import { Response, Request } from "express"
import { IBusiness } from "../types/business";
const Business = require('../models/businessModel');
const mongoose = require('mongoose');

interface User {
  _id: string;
  email: string;
}

interface ExtendedRequest extends Request {
  user: User;
}


// get all of one users businesses
const getAllPublishedBusinesses = async (req: Request, res: Response) => {
  try {
    const businesses: IBusiness[] = await Business.find({ isPublished: true }).sort({
      createdAt: -1,
    });

    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all of one users businesses
const getBusinesses = async (req: ExtendedRequest, res: Response) => {
  try {
    const user_id = req.user._id;

    const businesses: IBusiness[] = await Business.find({ user_id }).sort({ createdAt: -1 });

    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a single business
const getBusiness = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such business' });
  }

  const business: IBusiness = await Business.findById(id);

  if (!business) {
    return res.status(404).json({ error: 'No such business' });
  }

  res.status(200).json(business);
};

// create new business
const createBusiness = async (req: ExtendedRequest, res: Response) => {
  const { title, owner, shortDescription, longDescription, campus } = req.body;

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
  if (!longDescription) {
    emptyFields.push('longDescription');
  }
  if (!campus) {
    emptyFields.push('campus');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const business: IBusiness = await Business.create({
      title,
      owner,
      shortDescription,
      longDescription,
      campus,
      user_id,
      isPublished: false,
    });
    res.status(200).json(business);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a business
const deleteBusiness = async (req: ExtendedRequest, res: Response) => {
  const { id } = req.params;
  const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such business' });
  }

  const business: IBusiness = await Business.findOneAndDelete({ _id: id, user_id });

  if (!business) {
    return res
      .status(400)
      .json({ error: 'No such business or not authorized' });
  }

  res.status(200).json(business);
};

// update a business
const updateBusiness = async (req: ExtendedRequest, res: Response) => {
  const { id } = req.params;
  const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such business or unauthorized' });
  }

  const business: IBusiness = await Business.findOneAndUpdate(
    { _id: id, user_id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!business) {
    return res.status(400).json({ error: 'No such business' });
  }

  res.status(200).json(business);
};

module.exports = {
  getAllPublishedBusinesses,
  getBusinesses,
  getBusiness,
  createBusiness,
  deleteBusiness,
  updateBusiness,
};
