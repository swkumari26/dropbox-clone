import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import {logoutAndRedirect} from '../actions/index';
import { bindActionCreators } from 'redux';

class Header extends Component {
render(){
  const{pageName,userName,logoutAndRedirect} = this.props;
  return (
    <div className="container-fluid">
    <div className="row">
    <div className="col-lg-6 col-md-6 col-sm-6">
    <h3>{pageName}</h3>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-6">
    <div className="float-right">
      <DropdownMenu userName={userName} position="left" triggerType='icon' trigger='glyphicon glyphicon-user'>
        <MenuItem text='Settings                      '/>
        <MenuItem type='separator' />
        <MenuItem text='Logout                        ' onClick={(e) => {e.preventDefault(); logoutAndRedirect();}} />
      </DropdownMenu>    
    </div>
    </div>    
    </div>
    </div>
  	);
	}
}
function mapStateToProps(state) {
  const selector = formValueSelector('authentication') // <-- same as form name
  console.log(state)
  const {firstname,lastname,email,password} = selector(state, 'firstname', 'lastname','email','password')   
  const signInPage=state.login.signInPage
    return { 
      user:{firstname,lastname,email,password},
      signInPage: signInPage
    }
  }
function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({logoutAndRedirect},dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);    // Learn 'Currying' in functional programming