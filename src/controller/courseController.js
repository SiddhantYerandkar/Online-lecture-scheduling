const courseModel = require('../models/courseModel')
const cloudinary = require('../controller/cloudinary')
const instructorModel = require('../models/instructorModel')
const validator = require('../middleware/validator')

const { isValidName, isValidString, isValidDate, isIdValidId } = validator

const createCourse = async function (req, res) {
    try {
        const data = req.body
        const { name, level, description, lectures } = data

        //validating the data entered
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Body must not be empty" })
        }
        if (!name) {
            return res.status(400).send({ status: false, message: "Name is required" })
        }
        if (!isValidString(name) || !isValidName(name)) {
            return res.status(400).send({ status: false, message: "Enter a valid Name" })
        }
        if (!level) {
            return res.status(400).send({ status: false, message: "level is required" })
        }
        if (!isValidString(level)) {
            return res.status(400).send({ status: false, message: "Enter a valid level" })
        }
        if (!description) {
            return res.status(400).send({ status: false, message: "description is required" })
        }
        if (!isValidString(description)) {
            return res.status(400).send({ status: false, message: "Enter a valid description" })
        }
        let image = req.files
        if (image == undefined || image.length == 0) return res.status(400).send({ status: false, message: "Please provide a course image" })

        //validation of Image and then uploading on cloudinary
        if (image.length == 1) {
            if (image[0].mimetype.split('/')[0] != 'image') {
                return res.status(400).send({ status: false, message: "Provide a jpeg or png file" })
            }
            let imageLink = await cloudinary.uploadFile(image[0])
            data.image = imageLink
        }

        const courseData = await courseModel.create(data)
        return res.status(201).send({ status: true, data: courseData, message: "Course created successfully" });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const addLectureToCourse = async function (req, res) {
    try {
        const courseId = req.params.courseId
        const { instructorId, date } = req.body

        //validating courseId
        if (!courseId) {
            return res.status(400).send({ status: false, message: "courseId required" })
        }
        if (!isIdValidId(courseId)) {
            return res.status(400).send({ status: false, message: "courseId entered is not a valid Id" })
        }

        //checking if course exist in database or not
        const findCourse = await courseModel.findById(courseId)
        if (!findCourse) {
            return res.status(404).send({ status: false, message: "course not found" })
        }

        //validating instructorId
        if (!instructorId) {
            return res.status(400).send({ status: false, message: "InstructorId is required" })
        }
        if (!isIdValidId(instructorId)) {
            return res.status(400).send({ status: false, message: "InstructorId entered is not a valid Id" })
        }

        //checking if instructor is present or not
        const findInstructor = await instructorModel.findById(instructorId)
        if (!findInstructor) {
            return res.status(404).send({ status: false, message: "Instructor not found" })
        }

        //validating date
        if (!date) {
            return res.status(400).send({ status: false, message: "date is required" })
        }
        if (!isValidDate(date)) {
            return res.status(400).send({ status: false, message: "Date must be in a valid format" })
        }

        //checking if instructor is already assigned to lecture on the date entered
        const existingLecture = await courseModel.findOne(
            { lectures: { $elemMatch: { instructor: instructorId, date } } }
        )
        
        if (existingLecture) {
            return res.status(400).send({ status: false, message: "Instructor is already assigned on this date" })
        }

        const updateData = await courseModel.findOneAndUpdate(
            { _id: courseId },
            { $push: { lectures: { instructor: instructorId, date: date } } },
            { new: true }
        )
        return res.status(200).send({ status: true, data: updateData, message: "Successfully added lecture to course" })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createCourse, addLectureToCourse }