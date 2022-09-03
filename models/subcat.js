const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const subcatSchema = new Schema({
    subcatName: String,
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questions'
    }],
    active: {
        type: Boolean,
        default: false
    },
    time: Number
});


const Subcat = mongoose.model('subCategory', subcatSchema);

module.exports = Subcat;