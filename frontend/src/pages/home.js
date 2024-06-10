import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { useTokenExpiration } from "../hooks/useTokenExpiration"

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    //const [workouts, setWorkouts] = useState(null) //replaced with reducer
    const {workouts, dispatch} = useWorkoutsContext()
    const {user, dispatch: userDispatch} = useAuthContext() //returns {user: someValue} where someValue is an object with email and token properties

    useTokenExpiration() //will run on home component mount and whenever interval updates

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json() //array of workout objects 

            if(response.ok) {
                //setWorkouts(json)

                //dispatch function fires workoutsReducer function and passes in the action (the object we passed as argument to dispatch)
                dispatch({type: 'SET_WORKOUTS', payload: json}) 
            }

            if(!response.ok) { //if token cannot be verified by requireAuth middleware
                userDispatch({type: 'LOGOUT'})
                console.log("Logged out")
            }
            
        }
        if(user) { //only fetch workouts if a user is logged in
            fetchWorkouts()
        }
    }, [dispatch, user]) 


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