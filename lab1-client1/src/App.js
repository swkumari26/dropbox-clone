import React, {Component} from 'react';
import configureStore from './configureStore'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import Calculator from './components/Calculator';
const store = configureStore()


class App extends Component {

    render() {

        return (
      <Provider store={store}>
        <div>
        <Route exact path="/" component={Calculator} />
        </div>      
      </Provider>       
        );
    }
}

export default App;