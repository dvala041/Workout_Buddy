import {useEffect} from 'react'
import { useAuthContext } from './useAuthContext'
import { jwtDecode } from 'jwt-decode'
import {useSnackbar} from 'notistack'

export const useTokenExpiration = () => {
    const {user, dispatch} = useAuthContext() //returns {user, dispatch} where user = {token: value, email: value}
    const {enqueueSnackbar} = useSnackbar()

    useEffect(() => {
        const checkTokenExpiration = () => {
            if(user) {
                //check their token compared to current time
                const decodedToken = jwtDecode(user.token) //token is an object with an exp property

                //compare to current time in seconds since exp is in seconds
                if(decodedToken.exp < Date.now()/1000) {
                    enqueueSnackbar('Your session has expired. Please log in again.', { variant: 'warning' })
                    dispatch({type: 'LOGOUT'})
                }
            
            }
        }

        //check immediately if token is expired
        checkTokenExpiration()

        //check if token is expired periodically
        const intervalId = setInterval(() => {
            checkTokenExpiration()
        }, 30 * 60000) //checks token every 30 minutes


        //at the end of a useEffect you must clean up to avoid memory leakage
        return () => clearInterval(intervalId)
    }, [user, dispatch, enqueueSnackbar])
}