var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const requireAuth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // verify user is authenticated
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }
    const token = authorization.split(' ')[1];
    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        req.user = yield User.findOne({ _id }).select('_id');
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
});
module.exports = requireAuth;
