//Imports
const express = require('express');
const categoryController = require('../controllers/categoryController');

//Initializes express router
const router = express.Router();

//Routers
router.route('/').post(categoryController.createCategory);
router.route('/:id').delete(categoryController.deleteCategory);

//exports router
module.exports = router;