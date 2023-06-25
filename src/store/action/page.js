import axios from 'axios'
import * as actionType from './actionType'


const token = JSON.parse(localStorage.getItem("token"))



export const getPage = (bookId, pageNumber) => async (dispatch, getState) => {

    
    try {

        dispatch({
            type:actionType.GET_PAGE_START
        })


        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };
          



        const {data} = await axios.get(`http://192.168.1.3:9000/api/page/${bookId}/?page_number=${pageNumber}`,config )

        console.log(await data)

        dispatch({
            type: actionType.GET_PAGE_SUCESS,
            payload: data
        })
        return data

    }catch(e) {
        dispatch({
            type: actionType.GET_PAGE_FAIL,
            error: e.message
        })
        return 500
    }   
}


export const createPage = (bookId, content) => async (dispatch, getState) => {

    
    try {

        dispatch({
            type:actionType.CREATE_PAGE_START
        })

        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };

        const {data} = await axios.post(`http://192.168.1.3:9000/api/page/${bookId}/` ,{
            book: bookId,
            content:content
        },config)

        console.log(await data)

        dispatch({
            type: actionType.CREATE_PAGE_SUCESS,
            payload: data
        })
        return data

    }catch(e) {
        dispatch({
            type: actionType.CREATE_PAGE_FAIL,
            error: e.message
        })
        return 500
    }   
}


export const editPage = (bookId, pageId, content) => async (dispatch, getState) => {

    
    try {

        dispatch({
            type:actionType.EDIT_PAGE_START
        })

        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };

        const {data} = await axios.patch(`http://localhost:9000/api/page/${bookId}/${pageId}/`,{
            content:content
        }, config);

        console.log(await data)

        dispatch({
            type: actionType.EDIT_PAGE_SUCESS,
            
        })
        return data

    }catch(e) {
        dispatch({
            type: actionType.EDIT_PAGE_FAIL,
            error: e.message
        })
        return 500
    }   
}


export const deletePage = (bookId, pageId) => async (dispatch, getState) => {

    
    try {

        dispatch({
            type:actionType.DELETE_PAGE_START
        })


        const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          };

        

        const {data} = await axios.delete(`http://localhost:9000/api/page/${bookId}/${pageId}/`, config)

        console.log(await data)

        dispatch({
            type: actionType.DELETE_PAGE_SUCESS,
            
        })
        return data

    }catch(e) {
        dispatch({
            type: actionType.DELETE_PAGE_FAIL,
            error: e.message
        })
        return 500
    }   
}



