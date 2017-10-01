import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
// import { BrowserRouter as Router } from 'react-router-dom'
import { Router } from 'react-router-dom'
// import { Router,hashHistory } from 'react-router'
// import { browserHistory } from 'react-router'
// import { createHashHistory } from 'history';
import history from './history';

render(
  <Router history={history}>
    <Root />
  </Router>,
  document.getElementById('root')
)