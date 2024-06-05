require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')

const app = express() // express app stores in app constant

//global middleware
app.use(express.json()) // necessary for access to req object
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts', workoutRoutes)

//error handling middleware
// app.use((err, req, res, next) => {
//     console.log(err)
//     res.status(500).json({error: 'Incorrect request body syntax'})
// })

//Connect to database
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen for requests only once we've connected to the database
    app.listen(process.env.PORT, () => {
        console.log('Connected to db and listening on port', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})



