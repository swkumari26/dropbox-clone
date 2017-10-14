import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
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
        var pathWithID = this.props.user.id[0]+'/'+this.props.files.absolute_path;
        file.append('path', pathWithID);
        file.append('myfile', event.target.files[0]);
        this.props.uploadFile(file,this.props.token);
    };
render(){
  const{uploadFile,files,user,token} = this.props; 
  return(
    <div className="row">
    <div className="col-lg-9">
    { 
      <Content files={files} token={token} user={user}/>
    }
    </div>
  <div className="col-lg-3">
  <div className="float-right">
   <div className="navbar">
   <div>
      <ul className="nav navbar-nav">
        <div className="upload-wrap">
          <input type="file" name="fileUpload" className="upload-btn" onChange={this.handleFileUpload}/>
          <button type="submit" className="btn btn-primary btn-block btn-lg">Upload files</button> 
        </div>  
        <br/> 
      <li><button className="buttonlink" onClick={() => {files.files.includes("")?"":this.setState({files:files.files.push("")});}}><NewFolder size={30}/><span> New folder </span></button></li>
      </ul>
    </div>
    </div>
    </div>
    </div>
  </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({uploadFile},dispatch)
    };
}
export default connect(null,mapDispatchToProps)(Body);