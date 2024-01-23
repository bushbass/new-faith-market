var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Business = require('../models/businessModel');
const mongoose = require('mongoose');
// get all of one users businesses
const getAllPublishedBusinesses = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const businesses = yield Business.find({ isPublished: true }).sort({
            createdAt: -1,
        });
        res.status(200).json(businesses);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
// get all of one users businesses
const getBusinesses = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user_id = req.user._id;
        const businesses = yield Business.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(businesses);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
// get a single business
const getBusiness = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such business' });
    }
    const business = yield Business.findById(id);
    if (!business) {
        return res.status(404).json({ error: 'No such business' });
    }
    res.status(200).json(business);
});
// create new business
const createBusiness = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
        const business = yield Business.create({
            title,
            owner,
            shortDescription,
            longDescription,
            campus,
            user_id,
            isPublished: false,
        });
        res.status(200).json(business);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// delete a business
const deleteBusiness = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { id } = req.params;
    const user_id = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such business' });
    }
    const business = yield Business.findOneAndDelete({ _id: id, user_id });
    if (!business) {
        return res
            .status(400)
            .json({ error: 'No such business or not authorized' });
    }
    res.status(200).json(business);
});
// update a business
const updateBusiness = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { id } = req.params;
    const user_id = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such business or unauthorized' });
    }
    const business = yield Business.findOneAndUpdate({ _id: id, user_id }, Object.assign({}, req.body), { new: true });
    if (!business) {
        return res.status(400).json({ error: 'No such business' });
    }
    res.status(200).json(business);
});
module.exports = {
    getAllPublishedBusinesses,
    getBusinesses,
    getBusiness,
    createBusiness,
    deleteBusiness,
    updateBusiness,
};
