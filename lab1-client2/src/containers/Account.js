import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import history from '../history';
import LoginComponent from '../components/Login'
import Header from '../components/Header'
import Body from '../components/Body'
import { bindActionCreators } from 'redux';
import {Link}  from 'react-router-dom'
class Account extends Component {
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
  const{token,user} = this.props; 
  return(
  <div className="row-fluid">
      <div className="col-lg-2">
        <div className="navbar navbar-fixed-left">
          <ul className="nav navbar-nav pull-left">
    <li><a href="#home"><i className="fa fa-home"></i><span> <img src="https://cfl.dropboxstatic.com/static/images/favicon-vflk5FiAC.ico"></img> </span></a></li>
   <li><Link to="" onClick={(e) => {e.preventDefault(); history.push('/home'); }}><h4>Home </h4></Link></li>
   <li><Link to="" onClick={(e) => {e.preventDefault(); history.push('/log'); }}><h4>Activity Log </h4></Link></li>
   <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </ul>
      </div>
      </div>
  <div className="col-lg-10">
  <Header pageName="Account"/>
  <div className = "row">
  <div className="col-lg-9 col-md-9 col-sm-9">
    {
    (!user)?"":
    (<div>
    <div className="jumbotron">About</div>
      <div>
          <table className="table">
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Name
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              {user.firstname+' '+user.lastname}
              </td> 
            </tr>             
        </table>
        <table className="table">
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Email
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              {user.email}
              </td> 
            </tr>             
        </table>        
      </div>
    <div className="jumbotron">Interests</div>
      <div>
        <table className="table">
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Music
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              Rock music, Pop
              </td> 
            </tr> 
        </table>   
        <table className="table">
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Show
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              Friends
              </td> 
            </tr> 
        </table> 
        <table className="table">
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Sports
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              Football,Baseball
              </td> 
            </tr> 
        </table>                      
      </div> 
    <div className="jumbotron">Life events</div> 
        <table className="table">
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Total Number of content created or uploaded(including file and folder)
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              {}
              </td> 
            </tr> 
        </table> 
        <table className="table">
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Total Number of files downloaded
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              {}
              </td> 
            </tr> 
        </table> 
        <table className="table">
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Total Number of contents deleted
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              {}
              </td> 
            </tr> 
        </table>  
        <table className="table">
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Total Number of contents shared
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              {}
              </td> 
            </tr> 
        </table>    
        <table className="table">
            <tr>
              <td className="col-lg-6 col-md-6 col-sm-6">
              Total Number of contents marked star
              </td>
              <td className="col-lg-6 col-md-6 col-sm-6 float-right">
              {}
              </td> 
            </tr> 
        </table> 
    </div>)
    }
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
        user:state.login.user[0],
        token: state.login.token,
        isAuthenticated: state.login.isAuthenticated
    }
    }
export default connect(mapStateToProps, null)(Account); 