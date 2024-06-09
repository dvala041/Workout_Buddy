import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext() //hooks cannot be called within functions
    const {dispatch: workoutsDispatch } = useWorkoutsContext() //workoutsContext is the variable name we choose and dispatch is the property name in the context object
    
    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch 'logout' action

        dispatch({type: "LOGOUT"}) 
        workoutsDispatch({type: "SET_WORKOUTS", payload: null})
    }

    return {logout}
}