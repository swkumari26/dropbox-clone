import React, { Component } from 'react'
import Folder from 'react-icons/lib/md/folder';
import File from 'react-icons/lib/go/file-text';
import {Link}  from 'react-router-dom'
import Content from './Content'
import {Field} from 'redux-form'
import history from '../history';
import { bindActionCreators } from 'redux';
import {createFolder} from '../actions/index';
import { connect } from 'react-redux'
class ContentItem extends Component { 
   // handleKeyPress = (event,path,token) => {
   //      if(event.key === "Enter")
   //      { console.log("enter pressed");
   //        (event) => {event.preventDefault(); 
   //        this.props.createFolder(path,token);
   //      }
   //      }
   //  };   
render(){  
  const{name,path,token} = this.props;
  console.log("name in sub:",name);
  console.log("path in contentitem:",path);
  console.log("token in contentitem:",token);
  let displayIcon;
  let link = '/home/'+name;
    if (name)
    {
  	if (name.indexOf('.') > -1)
  		{	displayIcon = (
          <a><input type="checkbox"/><File size={50}/><span>{name}</span></a>
    			)
    		}
    	else{
  			displayIcon = (
        <Link to="" onClick={(e) => {e.preventDefault(); history.push(link); }}><input type="checkbox"/><Folder size={50}/><span>{name}</span></Link>
  			) 
  		}
    }
    else
    {
        displayIcon = (
        <Link to="" onClick={(e) => {e.preventDefault(); history.push(link); }}><input type="checkbox"/><Folder size={50}/><input type="text" onKeyPress={(e) =>{e.preventDefault(); if(e.key==="Enter") this.props.createFolder(path,link); }}/></Link>
        )       
    }
  return(
  	<div>
  	{
		displayIcon
  	}
  	</div>
  	);	
}
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({createFolder},dispatch)
    };
}
export default connect(null,mapDispatchToProps)(ContentItem);