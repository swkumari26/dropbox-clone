import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import {autoRehydrate,persistStore} from 'redux-persist'
// import { BrowserRouter } from 'react-router-dom'
// import {routerMiddleware} from 'react-router-redux';

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ),
    autoRehydrate()
  )
}