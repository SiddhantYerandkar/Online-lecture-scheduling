const express = require('express')
const router = express.Router()
const instructorController = require('../controller/instructorController')
const courseController = require('../controller/courseController')

const { createInstructor, getAssignedLectures } = instructorController
const { createCourse, addLectureToCourse } = courseController

//creating new Instructor
router.post('/createInstructor', createInstructor)

//Get all lectures assigned to the instructor
router.get('/getAssignedLectures/:instructorId', getAssignedLectures )

//creating new course
router.post('/course', createCourse)

//adding lecture to the course created
router.post('/addLecture/:courseId', addLectureToCourse)

module.exports = router