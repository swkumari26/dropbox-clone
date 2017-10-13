import React from 'react';
import { Router } from 'react-router-dom'
import App from './App';
import reducer from './reducers';
import { render } from 'react-dom'
import history from './history';

render(
	<Router history={history}>
        <App/>
    </Router>,
    document.getElementById('root')
)