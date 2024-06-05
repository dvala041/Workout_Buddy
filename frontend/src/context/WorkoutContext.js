import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_WORKOUTS':
            return {workouts: action.payload}
        case 'CREATE_WORKOUT': //when we create a new workout we show the new one, 'action.payload', and the prev ones which are in state.workouts; remember the ... spreads it
            return {workouts: [action.payload, ...state.workouts] } //you are merging the payload and previous workouts into one list of workouts
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id) //return true if we want that workout to remain in the array
            }
        default:
            return state
    }
}

export const WorkoutsContextProvider = ({children}) => {
    //useReducer is similar to useState; dispatch updates the state value; difference lies in the reducer function
    const [state, dispatch] = useReducer(workoutsReducer, {workouts: null}) //first arg is a function name, second arg is an initial value
    
    /* The object passed in value will be available to all components*/
    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}> {/* You are merging the state object's properties and dispatch into a single object by using the spread operator*/}
            {children} {/*remember app is children */}
        </WorkoutsContext.Provider>
    )
}