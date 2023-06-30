const mongoose = require('mongoose');

//Instructor Schema
const instructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

//creating and exporting Instructor Model
module.exports = mongoose.model('instructor', instructorSchema)
