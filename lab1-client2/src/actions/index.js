import { checkHttpStatus, parseJSON } from '../utils';
import bcrypt from 'bcryptjs';
import genSalt from '../utils/salt'
// import {createHashHistory} from 'history';
// import createBrowserHistory from 'history/createBrowserHistory';
// import { push } from 'react-router-redux';
import history from '../history';

export const LOGIN_USER_SUCCESS='LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE='LOGIN_USER_FAILURE';
export const LOGIN_USER_REQUEST='LOGIN_USER_REQUEST';
export const LOGOUT_USER='LOGOUT_USER';
export const FETCH_PROTECTED_DATA_REQUEST='FETCH_PROTECTED_DATA_REQUEST';
export const RECEIVE_PROTECTED_DATA='RECEIVE_PROTECTED_DATA';
// export const history = createBrowserHistory({forceRefresh:true});
// export const history = createHashHistory({forceRefresh:true});


export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    token
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    status: error.response.status,
    statusText: error.response.statusText
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logOut() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return dispatch =>{ 
        dispatch(logOut());
        history.push('/');
    }
}
export const loginUser = (user,signIn) => {
	return dispatch =>{	
	    // Generate salt for password encryption
    const salt = genSalt(user.email);
    // Encrypt password
    bcrypt.hash(user.password, salt, (err, hash) => {
      // Something wrong while hashing
      if (err) {
        dispatch(loginUserFailure(err));
        return;
      }
      else 
      	{
        dispatch(loginUserRequest());
        if (signIn){        
        return fetch('http://localhost:3001/user/doLogin', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({email: user.email, password: hash})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(loginUserSuccess(response.token));
                    history.push('/home');
                    // dispatch(push('/home'));
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
		}
		else
		{
        return fetch('http://localhost:3001/user/signUp', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({firstname:user.firstname,lastname:user.lastname,email: user.email, password: hash})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(loginUserSuccess(response.token));
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })			
		}
	}
 });
    }
}