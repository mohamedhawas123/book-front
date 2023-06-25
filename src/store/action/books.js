import axios from 'axios'
import * as actionType from './actionType'


export const getBooks = () => async (dispatch, getState) => {

    console.log('getBooks')
    
    try {

        dispatch({
            type:actionType.GET_ALLBOOKS_START
        })

        const {data} = await axios.get("api/books")

        console.log(data)

        dispatch({
            type: actionType.GET_ALLBOOKS_SUCESS,
            payload: data
        })
        return data

    }catch(e) {
        dispatch({
            type: actionType.GET_ALLBOOKS_FAIL,
            error: e.message
        })
        return 500
    }   
}


export const getAuthorBooks = (author_id) => async (dispatch, getState) => {

    
    try {

        dispatch({
            type:actionType.GET_AUTHOR_BOOKS_START
        })

        const {data} = await axios.get("api/books", {
            params:{
                "author_id":author_id
            }
        })

        console.log(data)

        dispatch({
            type: actionType.GET_AUTHOR_BOOKS_SUCESS,
            payload: data
        })
        return data

    }catch(e) {
        dispatch({
            type: actionType.GET_AUTHOR_BOOKS_FAIL,
            error: e.message
        })
        return 500
    }   
}


export const getBook = (bookId) => async (dispatch, getState) => {

    console.log('getBooks')
    
    try {

        dispatch({
            type:actionType.GET_ONEBOOKS_START
        })

        const {data} = await axios.get(`http://127.0.0.1:9000/api/books/${bookId}/`)

        console.log(data)

        dispatch({
            type: actionType.GET_ONEBOOKS_SUCESS,
            payload: data
        })
        return data

    }catch(e) {
        dispatch({
            type: actionType.GET_ONEBOOKS_FAIL,
            error: e.message
        })
        return 500
    }   
}


export const createBook = (author_id, title) => async (dispatch, getState) => {

    
    try {

        dispatch({
            type:actionType.POST_AUTHOR_BOOKS_START
        })

        const {data} = await axios.post("api/books/", {
            author:author_id,
            title: title
        },
        
        )

        console.log(data)

        dispatch({
            type: actionType.POST_AUTHOR_BOOKS_SUCESS,
            payload: data
        })
        return data

    }catch(e) {
        dispatch({
            type: actionType.POST_AUTHOR_BOOKS_FAIL,
            error: e.message
        })
        return 500
    }   
}



export const deleteBook = (bookId) => async (dispatch, getState) => {

    
    try {

        dispatch({
            type:actionType.DELETE_AUTHOR_BOOKS_START
        })

        const {data} = await axios.delete(`api/books/${bookId}`)

        console.log(data)

        dispatch({
            type: actionType.DELETE_AUTHOR_BOOKS_SUCESS,
        })
        

    }catch(e) {
        dispatch({
            type: actionType.DELETE_AUTHOR_BOOKS_FAIL,
            error: e.message
        })
        return 500
    }   
}


export const editBook = (bookId, title) => async (dispatch, getState) => {

    
    try {

        dispatch({
            type:actionType.EDIT_AUTHOR_BOOKS_START
        })

        const {data} = await axios.patch(`api/books/${bookId}/`, {
            title: title
        })

        console.log(data)

        dispatch({
            type: actionType.EDIT_AUTHOR_BOOKS_SUCESS,
        })
        

    }catch(e) {
        dispatch({
            type: actionType.EDIT_AUTHOR_BOOKS_FAIL,
            error: e.message
        })
        return 500
    }   
}