import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutContext"

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    //const [workouts, setWorkouts] = useState(null) //replaced with reducer
    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json() //array of workout objects 

            if(response.ok) {
                //setWorkouts(json)

                //dispatch function fires workoutsReducer function and passes in the action (the object we passed as argument to dispatch)
                dispatch({type: 'SET_WORKOUTS', payload: json}) 
            }
        }

        fetchWorkouts()
    }, [dispatch]) //[] means this use effect will only fire once; when the component renders


    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key = {workout._id} workout = {workout}/> 
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home