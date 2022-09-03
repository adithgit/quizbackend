const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    catName: {
        type: String,
        required: true
    },
    subCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcat'
    }],
    imageURL: String
});


const Category = mongoose.model('category', categorySchema);

module.exports = Category;