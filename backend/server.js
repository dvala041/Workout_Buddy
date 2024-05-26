require('dotenv').config()
const express = require('express')

const app = express() // express app stores in app constant

//global middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//home route
app.get('/', (req, res) => {
    res.json({mssg: "Welcome to the app!"})
})

//listen for requests at certain port number
app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT)
})

