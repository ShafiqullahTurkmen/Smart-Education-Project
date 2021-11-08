const express  = require('express');
const authController  = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

router.route('/signUp').post(authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);

module.exports = router;