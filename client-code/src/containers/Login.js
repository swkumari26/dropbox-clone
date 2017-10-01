import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {loginUser} from '../actions/index';
import LoginComponent from '../components/Login'
import { bindActionCreators } from 'redux';

class Login extends Component {
  render() {
    const {loginUser } = this.props
    return (
      <div className="row">
      <div className="col-lg-3 col-md-3 col-sm-3">
      </div>
      <div className="col-lg-3 col-md-3 col-sm-3">
        <img src="https://cfl.dropboxstatic.com/static/images/empty_states/sign-in-vflchypbO.png"/>
      </div>   
      <div className="col-lg-3 col-md-3 col-sm-3">
        <LoginComponent loginUser={loginUser}/>
      </div> 
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({loginUser},dispatch)
    };
}
export default connect(null,mapDispatchToProps)(Login);