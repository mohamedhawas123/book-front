import * as actionTypes from '../action/actionType'


const initalState = {
  user: null,
  loading: false,
  error: null
}


const reducer = (state=initalState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_LOGIN_START: return { ...state, loading: true}
    case actionTypes.AUTH_LOGIN_SUCESS: return {...state, loading: false,user: action.payload }
    case actionTypes.AUTH_LOGIN_FAIL: return { ...state,loading: false, error: action.error}

    case actionTypes.AUTH_SIGNUP_START: return { ...state, loading: true}
    case actionTypes.AUTH_SIGNUP_SUCESS: return {...state, loading: false,user: action.payload }
    case actionTypes.AUTH_SIGNUP_FAIL: return { ...state,loading: false, error: action.error}

    default:
      return state
  }
}

export default reducer