const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddileware = require('../middlewares/rolemiddleware');

const router = express.Router();

router.route('/').post(roleMiddileware(['teacher', 'admin']), courseController.createCourse);
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);


module.exports = router;