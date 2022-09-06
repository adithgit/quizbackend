const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questionDef: {
        type: String,
        required: true
    },
    options: [{
        type: String
    }
    ],
    answerIndex: {
        type: Number,
        required: true
    },
    subCat:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    answerDef: {
        type: String,
        required: true
    },
    negative: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});



const Questions = mongoose.model('questions', questionSchema);

module.exports = Questions;
