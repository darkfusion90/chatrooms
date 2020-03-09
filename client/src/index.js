import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers'
import AppContainer from './containers/AppContainer';
import ModalContainer from './containers/ModalContainer';

const composeEnhanchers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhanchers(
    applyMiddleware(thunk)
));

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
        <ModalContainer />
    </Provider>,
    document.querySelector("#root")
);