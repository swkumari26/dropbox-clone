import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import {Link}  from 'react-router-dom'

class FileUpload extends Component {
render(){

const onChangeSubmit= (handleSubmit) =>{
    handleSubmit(onFormSubmit);
  }
      const onFormSubmit = (data) => {
        let formData = new FormData();
        formData.append('fileUpload', data.target.files[0]);
        console.log("form data",formData);
        return formData;
        }

  const{uploadFile} = this.props;
  return (
  	<div>
    <form onSubmit={(e) => {e.preventDefault(); uploadFile(onFormSubmit)}}>
      <div className="upload-wrap">
        <input type="file" name="fileUpload" className="upload-btn" onChange={onChangeSubmit(uploadFile)}/>
        <button type="submit" className="btn btn-primary btn-block btn-lg">Upload files</button>       
      </div>           
    </form>
    </div>
	)
}
}

export default FileUpload = reduxForm({
	form:'uploadFile'
})(FileUpload);