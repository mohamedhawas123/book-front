import * as actionType from '../action/actionType'

const initalState ={
    loading: false,
    error: null,
    page: null,
    created: false,
    edited: false,
    deleted:false
}




const reducer = (state=initalState, action) => {
    switch(action.type) {
        case actionType.GET_PAGE_START: return {...state, loading: true}
        case actionType.GET_PAGE_SUCESS: return {...state, loading: false, page: action.payload}
        case actionType.GET_PAGE_FAIL: return {...state, loading: false, error: action.error}

        case actionType.CREATE_PAGE_START: return {...state, loading: true}
        case actionType.CREATE_PAGE_SUCESS: return {...state, loading: false,created:true}
        case actionType.CREATE_PAGE_FAIL: return {...state, loading: false, error: action.error}


        case actionType.EDIT_PAGE_START: return {...state, loading: true}
        case actionType.EDIT_PAGE_SUCESS: return {...state, loading: false,edited:true}
        case actionType.EDIT_PAGE_FAIL: return {...state, loading: false, error: action.error}

        case actionType.DELETE_PAGE_START: return {...state, loading: true}
        case actionType.DELETE_PAGE_SUCESS: return {...state, loading: false,delete:true}
        case actionType.DELETE_PAGE_FAIL: return {...state, loading: false, error: action.error}

        default:
            return state
        

    }
}

export default reducer