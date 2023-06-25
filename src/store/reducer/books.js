import * as actionType from '../action/actionType'

const initalState ={
    loading: false,
    error: null,
    books: [],
    oneBook: null,
    author_books : [],
    success: false
    
}




const reducer = (state=initalState, action) => {
    switch(action.type) {
        case actionType.GET_ALLBOOKS_START: return {...state, loading: true}
        case actionType.GET_ALLBOOKS_SUCESS: return {...state, loading: false, books: action.payload}
        case actionType.GET_ALLBOOKS_FAIL: return {...state, loading: false, error: action.error}


        case actionType.GET_ONEBOOKS_START: return {...state, loading: true}
        case actionType.GET_ONEBOOKS_SUCESS: return {...state, loading: false, oneBook: action.payload}
        case actionType.GET_ONEBOOKS_FAIL: return {...state, loading: false, error: action.error}

        case actionType.GET_AUTHOR_BOOKS_START: return {...state, loading: true}
        case actionType.GET_AUTHOR_BOOKS_SUCESS: return {...state, loading: false, author_books: action.payload}
        case actionType.GET_AUTHOR_BOOKS_FAIL: return {...state, loading: false, error: action.error}

        case actionType.POST_AUTHOR_BOOKS_START: return {...state, loading: true}
        case actionType.POST_AUTHOR_BOOKS_SUCESS: return {...state, loading: false,success: true }
        case actionType.POST_AUTHOR_BOOKS_FAIL: return {...state, loading: false, error: action.error, success: false}

        case actionType.DELETE_AUTHOR_BOOKS_START: return {...state, loading: true}
        case actionType.DELETE_AUTHOR_BOOKS_SUCESS: return {...state, loading: false,success: true }
        case actionType.DELETE_AUTHOR_BOOKS_FAIL: return {...state, loading: false, error: action.error, success: false}

        case actionType.EDIT_AUTHOR_BOOKS_START: return {...state, loading: true}
        case actionType.EDIT_AUTHOR_BOOKS_SUCESS: return {...state, loading: false,success: true }
        case actionType.EDIT_AUTHOR_BOOKS_FAIL: return {...state, loading: false, error: action.error, success: false}



        default:
            return state
        

    }
}

export default reducer