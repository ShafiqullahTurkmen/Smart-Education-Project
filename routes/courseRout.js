//Imports
const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddileware = require('../middlewares/rolemiddleware');

//Initializes express router
const router = express.Router();

//Routers
router.route('/').post(roleMiddileware(['teacher', 'admin']), courseController.createCourse);
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);
router.route('/:slug').delete(courseController.deleteCourse);
router.route('/:slug').put(courseController.updateCourse);
router.route('/enroll').post(courseController.enrollCourse);
router.route('/release').post(courseController.releaseCourse);

//exports router
module.exports = router;