const express = require('express')
const router = express.Router()
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout,
} = require('../controllers/workoutControllers')

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth) //this is the middleware for requiring Auth for all workout routes


// GET all workouts; /api/workouts/
router.get('/', getWorkouts)

// GET a single workout
router.get("/:id", getWorkout)

// POST a new workout
router.post("/", createWorkout)

// DELETE a workout
router.delete("/:id", deleteWorkout)

// Update a workout
router.patch("/:id", updateWorkout)


module.exports = router