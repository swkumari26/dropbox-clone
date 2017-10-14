import { checkHttpStatus, parseJSON } from '../utils';
import bcrypt from 'bcryptjs';
import genSalt from '../utils/salt'
import history from '../history';

export const LOGIN_USER_SUCCESS='LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE='LOGIN_USER_FAILURE';
export const LOGIN_USER_REQUEST='LOGIN_USER_REQUEST';
export const LOGOUT_USER='LOGOUT_USER';
export const FETCH_PROTECTED_DATA_REQUEST='FETCH_PROTECTED_DATA_REQUEST';
export const RECEIVE_PROTECTED_DATA='RECEIVE_PROTECTED_DATA';
export const UPLOAD_SUCCESS='UPLOAD_SUCCESS';
export const UPLOAD_FAILURE='UPLOAD_FAILURE';
export const UPLOAD_REQUEST='UPLOAD_REQUEST';
export const ADD_FOLDER_SPACE='ADD_FOLDER_SPACE';
export const CONTENT_SELECTED='CONTENT_SELECTED';
export const QUERY_SUCCESS='QUERY_SUCCESS';


export function loginUserSuccess(data) {
  localStorage.setItem('token', data.response.token);
  var tree = buildtree(data.response.result); 
  addMetaData(tree,data.response.contentMetaData)
  console.log("tree in action",tree); 
  return {
    type: LOGIN_USER_SUCCESS,
    token:data.response.token,
    result:data.response.result,
    tree:tree,
    user:data.response.user
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

export function uploadSuccess(data) {
var tree = buildtree(data.response.result);     
addMetaData(tree,data.response.contentMetaData)
  return {
    type: UPLOAD_SUCCESS,
    result:data.response.result,
    tree:tree
  }
}

export function querySuccess(data) {
  return {
    type: QUERY_SUCCESS,
    accounts:data.response.accounts,
  }
}

export function uploadFailure(error) {
  return {
    type: UPLOAD_FAILURE,
    status: error.response.status,
    statusText: error.response.statusText
  }
}

export function uploadRequest() {
  return {
    type: UPLOAD_REQUEST
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
export function contentSelected(path,name){
    return {
        type: CONTENT_SELECTED,
        path:path,
        name:name
    }
}
export const loginUser = (user,signIn) => {
	return dispatch =>{	
	   //  // Generate salt for password encryption
    // const salt = genSalt(user.email);
    // // Encrypt password
    // bcrypt.hash(user.password, salt, (err, hash) => {
    //   // Something wrong while hashing
    //   if (err) {
    //     dispatch(loginUserFailure(err));
    //     return;
    //   }
    //   else 
    //   	{
        dispatch(loginUserRequest());
        if (signIn){        
        return fetch('http://localhost:3001/user/doLogin', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                // body: JSON.stringify({email: user.email, password: hash})
                body: JSON.stringify({email: user.email, password: user.password})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(loginUserSuccess({response:{
                                token:response.token,
                                result:response.result,
                                user:response.user,
                                contentMetaData:response.contentMetaData
                    }}));
                    history.push('/home');                    
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
                // body: JSON.stringify({firstname:user.firstname,lastname:user.lastname,email: user.email, password: hash})
                body: JSON.stringify({firstname:user.firstname,lastname:user.lastname,email: user.email, password: user.password})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(loginUserSuccess({response:{
                                token:response.token
                    }}));
                    history.push('/home');
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
 // });
    }
// }
export const itemClicked = (name) => {
    console.log("name received",name);
    history.push(name);  
}
export const uploadFile = (file,token) =>{
    console.log("file received in action",file);
  return dispatch => {
    dispatch(uploadRequest());
       return fetch('http://localhost:3001/uploadData/uploadFile', {
            method: 'POST', 
            headers: {
                'Authorization': token
            },                       
            body: file
            })
            .then(checkHttpStatus)
            .then(parseJSON)     
            .then(response => {
                try {
                    dispatch(uploadSuccess({response:{
                                result:response.result,
                                contentMetaData:response.contentMetaData
                    }}));             
                } catch (e) {
                    dispatch(uploadFailure({
                        response: {
                            status: 403,
                            statusText: 'File creation failed'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(uploadFailure(error));
            })
        }
  }

export const downloadFile = (file,token) =>{
    console.log("file received in action",file);
  return dispatch => {
    dispatch(uploadRequest());
       return fetch('http://localhost:3001/uploadData/uploadFile', {
            method: 'POST', 
            headers: {
                'Authorization': token
            },                       
            body: file
            })
            .then(checkHttpStatus)
            .then(parseJSON)     
            .then(response => {
                try {
                    dispatch(uploadSuccess({response:{
                                result:response.result,
                                contentMetaData:response.contentMetaData
                    }}));           
                } catch (e) {
                    dispatch(uploadFailure({
                        response: {
                            status: 403,
                            statusText: 'File creation failed'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(uploadFailure(error));
            })
        }
  }

export const createFolder = (path,token) =>{
    console.log("folder path received in action",path);
    console.log("token received in action",token);
  return dispatch => {
    dispatch(uploadRequest());
       return fetch('http://localhost:3001/uploadData/createFolder', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },               
            body: JSON.stringify({"folderPath":path})
            })
            .then(checkHttpStatus)
            .then(parseJSON)       
            .then(response => {
                try {
                    dispatch(uploadSuccess({response:{
                                result:response.result,
                                contentMetaData:response.contentMetaData
                    }}));            
                } catch (e) {
                    dispatch(uploadFailure({
                        response: {
                            status: 403,
                            statusText: 'Folder creation failed'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(uploadFailure(error));
            })
        }
  }

export const deleteContent = (path,token) =>{
    console.log("Path received in action",path);
    console.log("token received in action",token);
  return dispatch => {
    dispatch(uploadRequest());
        if(path.indexOf('.') > -1)
        {
       return fetch('http://localhost:3001/uploadData/deleteFile', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },               
            body: JSON.stringify({"filePath":path})
            })
            .then(checkHttpStatus)
            .then(parseJSON)       
            .then(response => {
                try {
                    dispatch(uploadSuccess({response:{
                                result:response.result,
                                contentMetaData:response.contentMetaData
                    }}));            
                } catch (e) {
                    dispatch(uploadFailure({
                        response: {
                            status: 403,
                            statusText: 'File deletion failed'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(uploadFailure(error));
            })
        }
        else{
       return fetch('http://localhost:3001/uploadData/deleteFolder', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },               
            body: JSON.stringify({"folderPath":path})
            })
            .then(checkHttpStatus)
            .then(parseJSON)       
            .then(response => {
                try {
                    dispatch(uploadSuccess({response:{
                                result:response.result,
                                contentMetaData:response.contentMetaData
                    }}));            
                } catch (e) {
                    dispatch(uploadFailure({
                        response: {
                            status: 403,
                            statusText: 'Folder deletion failed'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(uploadFailure(error));
            })            
        }
    }
  }  

export const starContent = (path,token) =>{
    console.log("folder path received in action",path);
    console.log("token received in action",token);
  return dispatch => {
    dispatch(uploadRequest());
       return fetch('http://localhost:3001/uploadData/createFolder', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },               
            body: JSON.stringify({"folderPath":path})
            })
            .then(checkHttpStatus)
            .then(parseJSON)       
            .then(response => {
                try {
                    dispatch(uploadSuccess({response:{
                                result:response.result,
                                contentMetaData:response.contentMetaData
                    }}));            
                } catch (e) {
                    dispatch(uploadFailure({
                        response: {
                            status: 403,
                            statusText: 'Folder creation failed'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(uploadFailure(error));
            })
        }
  }
export const shareContent = (email,accounts,name,path,token,user) =>{
var id;
path=user+'/'+path;
if(email.indexOf('@')>-1)
    {
    for(var i = 0; i < accounts.length; i++)
        {
        if(accounts[i].email == email)
            {
            id=accounts[i].id
            }
        }
    }
else
    {
    for(var i = 0; i < accounts.length; i++)
    {   var fullname = accounts[i].firstname+" "+accounts[i].lastname;
    if(fullname == email)
        {
            id=accounts[i].id
        }
    }
    }
  return dispatch => {
    dispatch(uploadRequest());
       return fetch('http://localhost:3001/uploadData/shareContent', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token.token
            },               
            body: JSON.stringify({"sharedto":id,"name":name,"path":path})
            })
            .then(checkHttpStatus)
            .then(parseJSON)       
            .then(response => {
                try {
                    dispatch(uploadSuccess({response:{
                                result:response.result,
                                contentMetaData:response.contentMetaData
                    }}));            
                } catch (e) {
                    dispatch(uploadFailure({
                        response: {
                            status: 403,
                            statusText: 'Sharing failed'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(uploadFailure(error));
            })
        }
  } 
export const getAccounts = (token) =>{
  return dispatch => {
    dispatch(uploadRequest());
       return fetch('http://localhost:3001/user/getUsers', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token.token
            }             
            })
            .then(checkHttpStatus)
            .then(parseJSON)       
            .then(response => {
                try {
                    dispatch(querySuccess({response:{
                                    accounts:response.accounts
                    }}));            
                } catch (e) {
                    dispatch(uploadFailure({
                        response: {
                            status: 403,
                            statusText: 'Account fetch failed'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(uploadFailure(error));
            })
        }
  }   
function addMetaData(tree,contentMetaData)
{
    for(var i=0;i<tree.length;i++){
    tree[i].star = contentMetaData[tree[i].absolute_path].star;
    tree[i].modifiedOn = contentMetaData[tree[i].absolute_path].createdOn;
    tree[i].members = contentMetaData[tree[i].absolute_path].members;
    tree[i].createdBy = contentMetaData[tree[i].absolute_path].createdBy;
    }
}

function buildtree(result)
{
var tree = {
    root: {
    absolute_path: '',
    files: [],
    star:false,
    modifiedOn:null,
    members:[],
    createdBy:null
  }
};

function buildTree(parts) {
  var lastDir = 'root';
  var abs_path = '';


  parts.map((name) =>{
      if (tree[lastDir].files.indexOf(name)==-1)
      {
      tree[lastDir].files.push(name);    
    }
    // It's a directory
    if (name.indexOf('.') === -1) {

      lastDir = name;
      abs_path += lastDir + '/';

      if (!tree[name]) {
        tree[name] = {
          absolute_path: abs_path,
          files: [],
          star:false,
          modifiedOn:null,
          members:null          
        };
      }
    }
  });
}

result.map((path)=> {
  buildTree(path.split('/'));
});

return tree;    
}