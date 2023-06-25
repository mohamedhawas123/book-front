import axios from 'axios'
import * as actionTypes from './actionType'


export const userLogin =  (username, password) => async (dispatch, getState) => {


    try {
        dispatch({
            type: actionTypes.AUTH_LOGIN_START
        })

        const {data} = await axios.post(`users/signin/`, {
            username: username,
            password: password
        })

        console.log(data.access);

        dispatch({
            type: actionTypes.AUTH_LOGIN_SUCESS,
            payload: data
        })
        localStorage.setItem('user', JSON.stringify(data))
        localStorage.setItem('token', JSON.stringify(data.access))


        return data;



    }catch(e) {
        dispatch({
            type:actionTypes.AUTH_LOGIN_FAIL,
            error: e.message
        })

        return 500
    }
    
}


export const userSignup =  (firstname, lastname, username, password) => async (dispatch, getState) => {


    try {
        dispatch({
            type: actionTypes.AUTH_SIGNUP_START
        })

        const {data} = await axios.post(`users/signup/`, {
            first_name:firstname,
            last_name: lastname,
            username: username,
            password: password
        })

        console.log(data);

        dispatch({
            type: actionTypes.AUTH_SIGNUP_SUCESS,
            payload: data
        })
        localStorage.setItem('user', JSON.stringify(data))
        localStorage.setItem('token', JSON.stringify(data.tokens.access))


        return data;



    }catch(e) {
        dispatch({
            type:actionTypes.AUTH_SIGNUP_FAIL,
            error: e.message
        })

        return 500
    }
    
}


export const signOut = () => (dispatch, userState) => {
    localStorage.clear()
    
}