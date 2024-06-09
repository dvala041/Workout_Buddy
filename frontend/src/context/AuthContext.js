import { createContext, useReducer, useEffect} from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null} //reset user back to null
        default: 
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {user: null}) 

    useEffect(() => {
        //user is an object with an email and token property (cuz this is what our backend sends)
        const user = JSON.parse(localStorage.getItem("user")) //localStorage is a string so we want to parse it as a javascript object

        if(user) {
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])
    console.log("AuthContext state: ", state )

    
    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}