var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};
// login a user
const loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User.login(email, password);
        // create a token
        const token = createToken(user._id);
        res.status(200).json({ email, token, id: user._id });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// signup a user
const signupUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User.signup(email, password);
        // create a token
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = { signupUser, loginUser };
