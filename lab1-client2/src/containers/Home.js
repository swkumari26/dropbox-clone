import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import history from '../history';
import LoginComponent from '../components/Login'
import Header from '../components/Header'
import Body from '../components/Body'
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
        //      history.push('/');
        //     }
        // }  
  render() {
  const{tree,token} = this.props; 
var files={};
console.log("tree in home is:",tree)
  console.log("parameters at home",this.props.match.params.folder);
  if(this.props.match.params.folder)
  {
    files = tree[this.props.match.params.folder];
  }   
  else
  {
    files = tree.root;
  }
  return(
    <div className="row-fluid">
    <div className="col-lg-2">
    <div className="navbar navbar-fixed-left">
  <ul className="nav navbar-nav pull-left">
    <li><a href="#home"><i className="fa fa-home"></i><span> <img src="https://cfl.dropboxstatic.com/static/images/favicon-vflk5FiAC.ico"></img> </span></a></li>
   <li><a href="#info"><i className="fa fa-info-circle"></i><span> My files </span></a></li>
   <li><a href="#love"><i className="fa fa-heart"></i><span> Sharing </span></a></li>
   <li><a href="#work"><i className="fa fa-briefcase"></i><span> Deleted files </span></a></li>
   <li><a href="#contact"><i className="fa fa-envelope"></i><span> </span></a></li>
   <li><a href="#contact"><i className="fa fa-envelope"></i><span> </span></a></li>
   <li><a href="#contact"><i className="fa fa-envelope"></i><span> </span></a></li>
   <li><a href="#contact"><i className="fa fa-envelope"></i><span> </span></a></li>
   <li><a href="#contact"><i className="fa fa-envelope"></i><span> </span></a></li>
   <li><a href="#contact"><i className="fa fa-envelope"></i><span> </span></a></li>
   <li><a href="#contact"><i className="fa fa-envelope"></i><span> </span></a></li>
   <li><a href="#contact"><i className="fa fa-envelope"></i><span> </span></a></li>
      <li><a href="#contact"><i className="fa fa-envelope"></i><span> </span></a></li>
   <li><a href="#contact"><i className="fa fa-envelope"></i><span> </span></a></li>
   <li><a href="#contact"><i className="fa fa-envelope"></i><span> </span></a></li>
  </ul>
  </div>
  </div>
  <div className="col-lg-10">
  <Header pageName="Home"/>
  <Body files={files} token={token}/>
  </div>
  </div>
      )
      }
  }
  function mapStateToProps(state) {
    return{
        token: state.login.token,
        isAuthenticated: state.login.isAuthenticated,
        tree:state.login.tree
    }
    }
export default connect(mapStateToProps, null)(Home); 