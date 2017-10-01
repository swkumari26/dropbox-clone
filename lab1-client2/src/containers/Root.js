import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'
import Login from './Login'
import Home from './Home'
import { Route } from 'react-router-dom'
const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
		<div>
		<Route exact path="/" component={Login} />
		<Route exact path="/home" component={Home} />
	    </div>      
	  </Provider>
    )
  }
}