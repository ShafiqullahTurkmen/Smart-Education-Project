const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

//Creates Course Schema
const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

//Creates slug-name by name of Course
CourseSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });

  next();
});

//Creates Category model
const Course = mongoose.model('Course', CourseSchema);

//exports Coures
module.exports = Course;
