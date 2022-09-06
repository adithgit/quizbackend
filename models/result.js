const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resultSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,    
        required: true    
    },
    subcat: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    timetaken: {
        type: Number,
        required: true
    },
    timestamp:{
        type: Date,
        required: true
    },
    totalpoints: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
});

const Result = mongoose.model('result', resultSchema);

module.exports = Result;
