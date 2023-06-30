const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

//Course Schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    lectures: [
        {
            instructor: { type: ObjectId, ref: 'instructor' },
            date: { type: Date }
        },
    ],
})

//creating and exporting course Model
module.exports = mongoose.model('course', courseSchema)