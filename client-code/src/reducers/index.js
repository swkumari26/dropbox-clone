import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER} from '../actions/index';
import jwtDecode from 'jwt-decode';
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
const initialState = {
    token: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

const login = (state = initialState, action) => {

    switch (action.type) {         
        case LOGIN_USER_REQUEST:
        return{
            ...state,
            'isAuthenticating': true,
            'statusText': null
        };
        case LOGIN_USER_SUCCESS:
        return{
            ...state,
            'token': [action.token],
            'isAuthenticated': true,
            'isAuthenticating': false,
            'statusText': 'You have been successfully logged in.'
        };
        case LOGIN_USER_FAILURE:
        return{
            ...state,
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'statusText': `Authentication Error: ${action.status} ${action.statusText}`
        };     
        case LOGOUT_USER:
        return{
            ...state,
            'isAuthenticated': false,
            'token': null,
            'statusText': 'You have been successfully logged out.'
        };   
        default :
            return state;            
    }
};

const reducers = {
  login,
  form: formReducer     // <---- Mounted at 'form'
}
const reducer = combineReducers(reducers)
export default reducer;
