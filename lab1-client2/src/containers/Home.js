import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import history from '../history';
import LoginComponent from '../components/Login'
import Header from '../components/Header'
import { bindActionCreators } from 'redux';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';
class Home extends Component {
        // componentWillMount () {
        //     this.checkAuth(this.props.isAuthenticated);
        // }

        // componentWillReceiveProps (nextProps) {
        //     this.checkAuth(nextProps.isAuthenticated);
        // }

        // checkAuth (isAuthenticated) {
        //     if (!isAuthenticated) {
        //     	history.push('/');
        //     }
        // }	
  render() {
	const items = [
  <SidebarItem color="#899ba9" activeHighlight="#d3d9de" hoverHighlight="#f0f2f4">My files</SidebarItem>,
  <SidebarItem color="#536170" hoverHighlight="#f0f2f4">Sharing</SidebarItem>,
  <SidebarItem color="#536170" hoverHighlight="#f0f2f4">Deleted files</SidebarItem>,
];  	
	return(
		<div className="row">
  <Sidebar background="#f0f2f4" content={items}>
  				<Header pageName="Home"/>
  </Sidebar>
  		</div>
  		)
  		}
	}
	function mapStateToProps(state) {
		return{
        token: state.login.token,
        isAuthenticated: state.login.isAuthenticated
    }
    }
export default connect(mapStateToProps, null)(Home); 