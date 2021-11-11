//Imports
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');

//Creates Users with validation
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).redirect('/login');
    } catch (error) {
        const errors = validationResult(req);
        console.log(errors); 
        console.log(errors.array()[0].msg);

        for (let i = 0; i < errors.array().length; i++) {
            req.flash('error', `${errors.array()[i].msg}`);
        }
        res.status(400).redirect('/register');
    }
};

//Makes a user log in with validation,
// creates a session, and saves the user id in the session.
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        await User.findOne({ email }, (err, user) => {
            if (user) {
                bcrypt.compare(password, user.password, (err, same) => {
                    if (same) {
                        // USER Session
                        req.session.userID = user._id;
                        res.status(200).redirect('/users/dashboard');
                    } else {
                        req.flash('error', 'Your Password in not Correct');
                        res.status(400).redirect('/login');
                    }
                });
            } else {
                req.flash('error', 'User is not exist');
                res.status(400).redirect('/login');
            }
        }).clone();
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

//Makes user log out
exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

//Gets Dashboard by user role
exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({ _id: req.session.userID }).populate(
        'courses'
    );
    const categories = await Category.find();
    const courses = await Course.find({ user: req.session.userID });
    const users = await User.find();
    res.status(200).render('dashboard', {
        page_name: 'dashboard',
        user,
        categories,
        courses,
        users
    });
};

//Deletes registered users and courses  depended on users
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id)
        await Course.deleteMany({user: req.params.id})

        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        res.status(200).json({
            status: 'fail',
            error,
        });
    }
};