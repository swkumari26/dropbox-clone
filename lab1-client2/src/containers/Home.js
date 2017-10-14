import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../history';
import LoginComponent from '../components/Login'
import Header from '../components/Header'
import Body from '../components/Body'
import { bindActionCreators } from 'redux';
import {Link}  from 'react-router-dom'
class Home extends Component {
        componentWillMount () {
            this.checkAuth(this.props.isAuthenticated);
        }

        componentWillReceiveProps (nextProps) {
            this.checkAuth(nextProps.isAuthenticated);
        }

        checkAuth (isAuthenticated) {
            if (!isAuthenticated) {
             history.push('/');
            }
        }  
  render() {
  const{tree,token,user,statusText} = this.props; 
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
   <li><Link to=" "><h4>Home </h4></Link></li>
   <li><Link to=" "><h4> Files </h4></Link></li>
   <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

  </ul>
  </div>
  </div>
  <div className="col-lg-10">
  <br/><br/>
  <Header pageName="Home"/>
  <br/><br/>
  <Body files={files} token={token} user={user}/>
  </div>
  </div>
      )
      }
  }
  function mapStateToProps(state) {
    return{
        user:state.login.user,
        token: state.login.token,
        isAuthenticated: state.login.isAuthenticated,
        tree:state.login.tree,
        statusText:state.login.statusText
    }
    }
export default connect(mapStateToProps, null)(Home); 