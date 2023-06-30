# Online-lecture-scheduling

The Online Lecture Scheduling Module is a web application that allows administrators to manage courses and schedule lectures for instructors. The module ensures that no two lectures clash with each other by checking the assigned dates for each lecture.

## Key points

- Admin panel for managing instructors, courses, and lectures
- Ability to add courses with details such as name, level, description, and image
- Assign multiple lectures (batches) to a course
- Assign lectures to any instructor on a specific dates
- Prevent assigning an instructor to multiple lectures on the same date
- Instructor panel to view assigned lectures with dates and course names

## Technologies Used

- Javascript
- Node.js
- Express.js
- MongoDB
- cloudinary ( free alternative of AWS S3)

## Routes/Links

- **POST /createInstructor** - Create a new Instructor
- **GET /getAssignedLectures/:instructorId** - Get all lectures assigned to the instructor
- **POST /course** - Create a new Course
- **POST /addLecture/:courseId** - adding lecture to the course created 

## Deplyoment

The Online Lecture Scheduling Module is deployed and can be accessed at [https://online-lecture-scheduling.onrender.com](https://online-lecture-scheduling.onrender.com).