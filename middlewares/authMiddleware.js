//Imports
const User = require('../models/User');

//Finds user id in the session whether it is exist or not
module.exports = (req, res, next) => {
    User.findById(req.session.userID, (err, user) => {
        if (err || !user) {
            return res.redirect('/login');
        }
        next();
    });
};
