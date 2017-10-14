import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'
import Login from './Login'
import Home from './Home'
import Account from './Account'
import { Route } from 'react-router-dom'
import {persistStore} from 'redux-persist'
const store = configureStore()
// persistStore(store)

export default class Root extends Component {
  constructor() {
    super()
    this.state = { rehydrated: false }
  }
  componentWillMount(){
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true })
    })
  }  	
  render() {
    if(!this.state.rehydrated){
      return <div>Loading...</div>
    }  	
    return (
      <Provider store={store}>
		<div>
		<Route exact path="/" component={Login} />
		<Route exact path="/home" component={Home } />
		<Route exact path="/home/:folder" component={Home } />
		<Route exact path="/account" component={Account } />
	    </div>      
	  </Provider>
    )
  }
}