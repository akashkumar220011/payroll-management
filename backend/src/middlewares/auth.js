const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee.model');
const {jwtSecret } = require('../config/env');

exports.protect = async (req, res , next) =>{
    let token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({ message: 'Not authorized'});
    try {
        const decoded = jwt.verify(token,jwtSecret);
        req.user = await Employee.findById(decoded.id).select('-password');
        next();
    } catch(err){
        res.status(401).json({ message: 'Token invalid'});
    }
};

exports.authorize = (...roles)=> (req, res, next)=>{
    if(!req.user || !roles.includes(req.user.role)){
        return res.status(403),json({message: 'Forbidden'});
    }
    next();
}