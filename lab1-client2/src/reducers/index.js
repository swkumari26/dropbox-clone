import {SIGNUP_USER_SUCCESS,QUERY_SUCCESS,LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER,UPLOAD_SUCCESS,CONTENT_SELECTED} from '../actions/index';
import jwtDecode from 'jwt-decode';
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
const initialState = {
    token: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    user:[],
    result: [],
    tree:null,
    contentSelected:{name:null,path:null},
    accounts:[{id:null,firstname:null,lastname:null,email:null},{id:null,firstname:null,lastname:null,email:null}]
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
            'statusText': 'You have been successfully logged in.',
            'user':[action.user][0],
            'result':[action.result][0],
            'tree':[action.tree][0]
        };
        case SIGNUP_USER_SUCCESS:        
        return{
            ...state,
            'token': [action.token],
            'isAuthenticated': true,
            'isAuthenticating': false,
            'statusText': 'You have been successfully logged in.',
            'user':[action.user][0]
        };        
        case LOGIN_USER_FAILURE:
        return{
            ...state,
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'statusText': `Authentication Error: ${action.status} ${action.statusText}`,
            'result':[],
            'tree':null
        };     
        case LOGOUT_USER:
        return{
            ...state,
            'isAuthenticated': false,
            'token': null,
            'statusText': 'You have been successfully logged out,please log in to continue..',
            'result':[],
            'tree':null
        };     
        case UPLOAD_SUCCESS:        
        return{
            ...state,
            'result': [action.result],
            'tree':[action.tree][0]
        }; 
        case QUERY_SUCCESS:        
        return{
            ...state,
            'accounts':[action.accounts][0]
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
