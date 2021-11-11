//Imports
const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

//Creates Category Schema
const CategorySchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: true,
    }, 
    slug: {
        type: String,
        unique: true,
    },

});

//Creates slug-name by name of Category
CategorySchema.pre('validate', function (next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    });
    next();
})

//Creates Category model
const Category = mongoose.model('Category', CategorySchema);

//exports Category
module.exports = Category;