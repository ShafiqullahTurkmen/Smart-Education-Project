const express  = require('express');
const authController  = require('../controllers/authController');

const router = express.Router();

router.route('/signUp').post(authController.createUser);

module.exports = router;