const mongoose = require('mongoose')

const Schema = mongoose.Schema

//defines structure of document
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {timestamps: true})

//(Model name, schema)
module.exports = mongoose.model('Workout', workoutSchema)


