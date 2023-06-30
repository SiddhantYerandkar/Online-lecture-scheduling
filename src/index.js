//importing required modules
const express = require('express')
const mongoose = require('mongoose')
const route = require('./routes/route')
const multer = require('multer')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const uri = process.env.MONGODB_URI

//setting up the middleware
app.use(multer().any())
app.use(express.json())

//make connection to the database
mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => console.log("MongoDb Connected"))
    .catch((error) => console.log(error))

app.use('/', route)

//checking for invalid url
app.use((req, res) => {
    res.status(404).send({ status: false, message: `Page Not Found , Given URL is incorrect for this application.` })
})

// starting the server
app.listen(PORT, () => console.log(`connected to ${PORT}`))