import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import NewFolder from 'react-icons/lib/md/folder-open';
import SharedFolder from 'react-icons/lib/md/folder-shared';
import EyeIcon from 'react-icons/lib/ti/eye-outline';
import Content from './Content'
import {uploadFile} from '../actions/index';
import {Link}  from 'react-router-dom'

export default class LogBody extends Component { 
render(){
  const{uploadFile,files,user,token,tree} = this.props; 
    console.log("files in body",files); 
  return(
    <div className="container-fluid">
      <div className="col-lg-9">
        <div className="row">
          <h7>Starred</h7>
        </div>
        <hr/>
        <div className="jumbotron-star">When you star items, they’ll show up here for easy access.</div>
        <div className="row">
          <h7>Recent</h7>
        </div>     
        <div className="row">
        {
        (Object.keys(files).length===0)?" ":     
        (<Content files={files} tree={tree} token={token} user={user}/>)
        }        
        </div>
      </div>
      <div className="col-lg-3">
        <div className="float:right">
        </div>
      </div>
    </div>
    )
  }
}