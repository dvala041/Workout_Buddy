import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"


const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    //Async cuz we're reaching out to API
    const handleSubmit = async (e) => {
        e.preventDefault() //prevents form from being submitted when we refresh the page

        //don't even try to make a post request if we aren't logged in
        if(!user) {
            setError("You must be logged in")
            return
        }

        const workout = {title, load, reps} //set workout equal to an object with these fields

        //making a POST request to this route to create a workout
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        
        //when we create a new workout our API sends the newly created function as JSON; retrieve it
        const json = await response.json()

        //if we got a 400 status response from /api/workouts/
        if(!response.ok) {
            setError(json.error) //the error property in the json object we send as a response ({error: No such workout})
            setEmptyFields(json.emptyFields)
        }

        if(response.ok) {
            setTitle("")
            setLoad("")
            setReps("")
            setError(null)
            setEmptyFields([])
            console.log("New workout added", json)
            dispatch({type:"CREATE_WORKOUT", payload: json}) //payload is the single document (workout) we just created
        }
    }
    
    
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3> Add a new workouts </h3>
            <label> Exercise Title: </label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? "error": "" }
            /> 

            <label> Load (lbs): </label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? "error": "" }
            /> 

            <label> Reps: </label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? "error": "" }
            /> 
            <button> Add Workout </button>
            {error && <div className = "error">{error}</div>} {/* If error not null a new div will be rendered*/}
        </form>
    )
}

export default WorkoutForm