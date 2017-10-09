import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import {logoutAndRedirect,addFolderSpace} from '../actions/index';
import { bindActionCreators } from 'redux';
import NewFolder from 'react-icons/lib/md/folder-open';
import SharedFolder from 'react-icons/lib/md/folder-shared';
import EyeIcon from 'react-icons/lib/ti/eye-outline';
import Content from './Content'
import {uploadFile} from '../actions/index';
import {Link}  from 'react-router-dom'

class Body extends Component {
   handleFileUpload = (event) => {
        const file = new FormData();
        uploadFile(event.target.files[0]);
    };
render(){
  const{uploadFile,files,token} = this.props; 
  return(
    <div className="row">
    <div className="col-lg-9">
    <Content files={files} token={token}/>
  </div>
  <div className="col-lg-3">
  <div className="float-right">
   <div className="navbar">
  <ul className="nav navbar-nav">
  <div className="upload-wrap">
  <input type="file" name="fileUpload" className="upload-btn" onChange={this.handleFileUpload}/>
  <button type="submit" className="btn btn-primary btn-block btn-lg">Upload files</button> 
  </div>     
   <li><button className="buttonlink" ><SharedFolder size={30}/><span> New shared folder </span></button></li>
   <li><button className="buttonlink" onClick={() => {this.setState({files:files.files.push("")});}}><NewFolder size={30}/><span> New folder </span></button></li>
   <li><button className="buttonlink" ><EyeIcon size={30}/><span> Show deleted files</span></button></li>
  </ul>
  </div>
  </div>
  </div>
  </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({uploadFile,addFolderSpace},dispatch)
    };
}
export default connect(null,mapDispatchToProps)(Body);