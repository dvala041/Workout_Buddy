import { useContext } from 'react'
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext) //context is the an object with a state and dispatch property

    //if we don't have a value for the context
    if(!context) {
        throw Error("useWorkoutContext must be used inside an AuthContextProvider")
    }
    return context //returns {state, dispatch}
}
