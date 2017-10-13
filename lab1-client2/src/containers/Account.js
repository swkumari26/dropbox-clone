import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import history from '../history';
import LoginComponent from '../components/Login'
import Header from '../components/Header'
import Body from '../components/Body'
import { bindActionCreators } from 'redux';
import { Sidebar, SidebarItem } from 'react-responsive-sidebar';
import {Table} from 'reactstrap';
class Account extends Component {
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
  const{token,user} = this.props; 
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
  <Header pageName="Account"/>
  <div className = "row">
  <div className="col-lg-9 col-md-9 col-sm-9">
    <div className="jumbotron">About</div>
      <div>
          <Table>
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Name
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              {user.firstname+''+user.lastname}
              </td> 
            </tr>             
        </Table>
        <Table>
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Email
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              {user.email}
              </td> 
            </tr>             
        </Table>        
      </div>
    <div className="jumbotron">Interests</div>
      <div>
        <Table>
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Music
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              {user.music}
              </td> 
            </tr> 
        </Table>   
        <Table>
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Show
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              {user.show}
              </td> 
            </tr> 
        </Table> 
        <Table>
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Sports
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              {user.sports}
              </td> 
            </tr> 
        </Table>                      
      </div> 
    <div className="jumbotron">Life events</div> 
        <Table>
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Total Number of content created or uploaded(including file and folder)
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              {user.contentUploaded}
              </td> 
            </tr> 
        </Table> 
        <Table>
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Total Number of files downloaded
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              {user.contentDownloaded}
              </td> 
            </tr> 
        </Table> 
        <Table>
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Total Number of contents deleted
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              {user.contentDeleted}
              </td> 
            </tr> 
        </Table>  
        <Table>
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Total Number of contents shared
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              {user.contentShared}
              </td> 
            </tr> 
        </Table>    
        <Table>
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Total Number of contents marked star
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              {user.contentMarkedStar}
              </td> 
            </tr> 
        </Table>  
  </div>
    <div className="col-lg-3">
      <div className="float-right"></div>
    </div>
  </div>
  </div>  
  </div>
      )
      }
  }
  function mapStateToProps(state) {
    return{
        user:state.login.user,
        token: state.login.token,
        isAuthenticated: state.login.isAuthenticated
    }
    }
export default connect(mapStateToProps, null)(Account); 