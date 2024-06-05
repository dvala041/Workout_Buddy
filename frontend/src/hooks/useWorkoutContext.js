import { useContext } from 'react'
import { WorkoutsContext } from "../context/WorkoutContext";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext) //context is the an object with a state and dispatch property

    //if we don't have a value for the context
    if(!context) {
        throw Error("useWorkoutContext must be used inside a WorkoutsContextProvider")
    }
    return context //returns context value to our child components
}
