import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux'; // Connects React with Redux
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'; // Gives direct access to dispatch function, without necessarily having to directly return an action object
import 'materialize-css/dist/css/materialize.min.css';

const root = document.getElementById('root');

// Redux storage instance, that holds all the state
const store = createStore(() => [], {}, applyMiddleware(ReduxThunk));

const AppComponent = (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(AppComponent, root);
