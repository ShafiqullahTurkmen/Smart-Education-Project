const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');

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

exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({ _id: req.session.userID }).populate(
        'courses'
    );
    const categories = await Category.find();
    const courses = await Course.find({ user: req.session.userID });
    res.status(200).render('dashboard', {
        page_name: 'dashboard',
        user,
        categories,
        courses,
    });
};
