import {QUERY_SUCCESS,LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER,UPLOAD_SUCCESS,CONTENT_SELECTED} from '../actions/index';
import jwtDecode from 'jwt-decode';
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
const initialState = {
    token: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    user:{id:null,firstname:null,lastname:null,email:null,music:null,show:null,sports:null,contentDeleted:null,contentUploaded:null,contentShared:null,contentDownloaded:null,contentMarkedStar:null},
    result: [ 'CMPE_272',
  'CMPE_272/25Feb',
  'CMPE_272/25Feb/4_WirelessTCP.ppt',
  'CMPE_272/25Feb/TCPextra.ppt',
  'CMPE_272/25Feb/TCPplots.ppt',
  'CMPE_272/test',
  'CMPE_272/test/empty',
  'CMPE_272/test/empty/emptyagain',
  'CMPE_272/test/text file.txt',
  'CMPE_272/User_manual.docx' ],
    tree:{
        'root':{ 'absolute_path': '','files': ['CMPE_272']},
        'CMPE_272':{ 'absolute_path': 'CMPE_272','files': ['test.txt','25Feb']},
        '25Feb':{ 'absolute_path': 'CMPE_272/25Feb','files': ['test2.txt','testn.pdf']}
    },
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
            'user':[action.user],
            'result':[action.result][0],
            'tree':[action.tree][0]
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
            'statusText': 'You have been successfully logged out,please log in to continue..'
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
        case CONTENT_SELECTED:        
        return{
            ...state,
            'contentSelected': {name:[action.name],path:[action.path]}
        };              
        case 'persist/REHYDRATE':
        return{
            ...state,
            'token': [action.payload.login.token][0],
            'isAuthenticated': [action.payload.login.isAuthenticated][0],
            'isAuthenticating': [action.payload.login.isAuthenticating][0],
            'statusText': [action.payload.login.statusText][0],
            'user':[action.payload.login.user][0],
            'result':[action.payload.login.result][0],
            'tree':[action.payload.login.tree][0]            
        }      
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
