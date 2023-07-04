const instructorModel = require('../models/instructorModel')
const validator = require('../middleware/validator')
const courseModel = require('../models/courseModel')

const { isValidName, isValidString, isIdValidId } = validator

//Create Instructor
const createInstructor = async function (req, res) {
    try {
        let data = req.body
        let { name } = data

        //validating name
        if (!name) {
            return res.status(400).send({ status: false, message: "Name is required" })
        }
        if (!isValidString(name) || !isValidName(name)) {
            return res.status(400).send({ status: false, message: "Enter a valid Name" })
        }

        //Finding instructor already present in db
        const findInstructor = await instructorModel.findOne({ name: name })
        if (findInstructor) {
            return res.status(400).send({ status: false, message: "instructor with same name is already present" })
        }
        //Creating instructor
        const instructor = await instructorModel.create(data)
        return res.status(201).send({ status: true, data: instructor, message: "new instructor created successfully" });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

// Get list of all instructors

const getAllInstructors = async function (req, res) {
    try {
        const instructor = await instructorModel.find()

        return res.status(200).send({ status: true, data: instructor, message:"Successful"})

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

// Get lectures assigned to the logged-in instructor
const getAssignedLectures = async function (req, res) {
    try {
        const instructorId = req.params.instructorId

        //validating Id
        if (!isIdValidId(instructorId)) {
            return res.status(400).send({ status: false, message: "Enter a valid InstructorId" })
        }

        //Finding instructor by Id
        const findInstructor = await instructorModel.findById(instructorId)
        if (!findInstructor) {
            return res.status(404).send({ status: false, message: "Instructor with this Instructorid not found" })
        }
        //Finding all lectures assigned to the instructor
        const assignedLectures = await courseModel.find({ 'lectures.instructor': instructorId }).select({ name: 1, 'lectures.date': 1, _id: 0 });

        return res.status(200).send({ status: true, data: assignedLectures })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createInstructor, getAssignedLectures, getAllInstructors }