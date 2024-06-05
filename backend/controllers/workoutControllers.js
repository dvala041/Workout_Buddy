const { response } = require('express')
const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')

//Get all workouts
const getWorkouts = async (req, res) => {
    //.find({}) means find all; .find(reps:20) would mean find all documents with reps = 20
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

//get a single workout
const getWorkout = async(req, res) => {
    const {id} = req.params

    //if our ID is not a valid mongoose ID
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({error: "No such workout"})
    }


    const workout = await Workout.findById(id)

    //if workout doesn't exist; workout is null
    if(!workout) {
        return res.status(404).json({error: "No such workout!"})
    }
    res.status(200).json(workout)

}


//create a new workout; createWorkout is a reference for this function
const createWorkout = async(req, res) => {
    const {title, reps, load} = req.body

    let emptyFields = []

    if(!title) {emptyFields.push('title')}
    if(!reps) {emptyFields.push('reps')}
    if(!load) {emptyFields.push('load')}

    //if any fields were empty no point in bothering moving on to the try-catch
    if(emptyFields.length > 0) { return res.status(400).json({error: "Please fill in on all fields!", emptyFields})}

    //need a try catch in case body values are wrong or missing
    try {
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    //invalid ID structure
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({errror: "Invalid id structure"})
    }

    const workout = await Workout.findByIdAndDelete(id)

    //workout not found
    if(!workout) {
        return res.status(404).json({error: "Workout doesn't exist"})
    }
    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Invalid ID structure"})
    }
    
    //{...req.body} is spread syntax and creates a copy of the req.body object
    const workout = await Workout.findByIdAndUpdate(id, {...req.body})

    if(!workout) {
        return res.status(404).json({error: "No workout found"})
    }

    const updatedWorkout = await Workout.findById(id)

    res.status(200).json(updatedWorkout)
}
//exporting an object with properties equal to our functions
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
}