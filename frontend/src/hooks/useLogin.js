import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async(email, password) => {
        //default values before every request
        setIsLoading(true)
        setError(null)


        const response = await fetch('/api/user/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        })

        const json = await response.json() //to get the response in json

        if(!response.ok) {
            setIsLoading(false) //cuz now we are no longer loading
            setError(json.error)
        } 

        if(response.ok) {
            //save the user's token to local storage 
            localStorage.setItem('user', JSON.stringify(json))

            //update the authcontext
            dispatch({type: 'LOGIN', payload: json}) 

            setIsLoading(false)
        }
    }

    return {login, isLoading, error}
}